import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { isRevealed, markHeroReady } from "../../introGate";
import photo from "../../assets/dhruv-neww.webp";
import photoTall from "../../assets/dhruv-torso.webp"; // same cutout, suit continued downward (desktop)

/*
 * HERO SCENE: portrait + chrome ring
 *
 * Layering is fixed and never depth-intersected, so the ring can't slice the photo:
 *     far half of the ring  ->  photo  ->  near half of the ring
 * The ring is split along its long axis. The two halves only meet at the two tips of the ring,
 * which sit outside the shoulders. Everything below the near arc is clipped away, so the body
 * looks like it comes out of the ring.
 */
const INTRO_DELAY = 0.1; // seconds after the gear loader starts lifting (introGate "revealed")
const CLIP_N = 64; // samples of the ring's lower edge passed to the shader
const TILT = -1.0; // ring plane tilted about X: its lower half is the half nearer the camera
const ROLL = 0.5; // on-screen diagonal of the ring (radians, right tip higher)
const SQUASH = [1.3, 0.84, 0.92]; // desktop scale of the ring along its local x (long axis), y, z
// Once the intro has played it never replays: a remounted canvas (context lost, scroll back up) starts fully visible.
let introPlayed = false;
const RING_MAT = { color: "#d8d9de", metalness: 1, roughness: 0.1, clearcoat: 0.6, clearcoatRoughness: 0.08, envMapIntensity: 1.7 };

/**
 * Twisted chrome ribbon: a flattened elliptical tube swept around a circle
 * while its flat side rotates (2 half-twists = full turn, so no seam).
 * Built as one indexed, wrapped mesh so normals stay perfectly smooth.
 */
function buildRibbon({ R = 2.2, nu = 360, nv = 40, halfTwists = 2 } = {}) {
  const pos = new Float32Array(nu * nv * 3);

  for (let i = 0; i < nu; i++) {
    const u = (i / nu) * Math.PI * 2;
    const cu = Math.cos(u);
    const su = Math.sin(u);
    const th = (halfTwists * u) / 2;
    const ct = Math.cos(th);
    const st = Math.sin(th);
    const a = 0.4 + 0.13 * Math.cos(u); // ribbon width
    const b = 0.062; // chrome edge thickness

    const Bx = cu * ct, By = su * ct, Bz = st;
    const Nx = -cu * st, Ny = -su * st, Nz = ct;

    for (let j = 0; j < nv; j++) {
      const p = (j / nv) * Math.PI * 2;
      const cp = Math.cos(p) * a;
      const sp = Math.sin(p) * b;
      const k = (i * nv + j) * 3;
      pos[k] = R * cu + cp * Bx + sp * Nx;
      pos[k + 1] = R * su + cp * By + sp * Ny;
      pos[k + 2] = cp * Bz + sp * Nz;
    }
  }

  const idx = [];
  for (let i = 0; i < nu; i++) {
    const i1 = (i + 1) % nu;
    for (let j = 0; j < nv; j++) {
      const j1 = (j + 1) % nv;
      const a = i * nv + j;
      const b = i1 * nv + j;
      const c = i1 * nv + j1;
      const d = i * nv + j1;
      idx.push(a, b, d, b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();

  // vertex (i=0, j=nv/4) sits on +N = +Z, so its normal must point +Z; flip winding if not
  const nz = geo.attributes.normal.getZ(nv / 4);
  if (nz < 0) {
    const flipped = geo.index.array.slice();
    for (let t = 0; t < flipped.length; t += 3) {
      const tmp = flipped[t + 1];
      flipped[t + 1] = flipped[t + 2];
      flipped[t + 2] = tmp;
    }
    geo.setIndex(new THREE.BufferAttribute(flipped, 1));
    geo.computeVertexNormals();
  }
  return geo;
}

/** Where the person really is inside the PNG (transparent margins ignored), as 0..1 fractions. */
function alphaBounds(img) {
  const w = 256;
  const h = Math.max(1, Math.round((w * img.height) / img.width));
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, w, h);
  const d = ctx.getImageData(0, 0, w, h).data;
  const rows = new Uint16Array(h);
  const cols = new Uint16Array(w);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (d[(y * w + x) * 4 + 3] > 40) {
        rows[y]++;
        cols[x]++;
      }
    }
  }
  const first = (arr) => arr.findIndex((n) => n >= 3);
  const top = first(rows);
  if (top < 0) return { top: 0, bottom: 1, left: 0, right: 1 };
  const bottom = h - 1 - [...rows].reverse().findIndex((n) => n >= 3);
  const left = first(cols);
  const right = w - 1 - [...cols].reverse().findIndex((n) => n >= 3);
  return { top: top / h, bottom: (bottom + 1) / h, left: left / w, right: (right + 1) / w };
}

/** Lowest point of the ring on screen (NDC y) over a full spin, for a ring centred at (0, posY). */
function ringLowestNdc(geo, camera, scale, posY) {
  const pos = geo.attributes.position;
  const tilt = new THREE.Matrix4().compose(
    new THREE.Vector3(),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(TILT, 0, 0)),
    new THREE.Vector3(scale * SQUASH[0], scale * SQUASH[1], scale * SQUASH[2])
  );
  const m = new THREE.Matrix4().makeRotationZ(ROLL).multiply(tilt);
  m.setPosition(0, posY, 0);
  const spin = new THREE.Quaternion();
  const axis = new THREE.Vector3(0, 0, 1);
  const v = new THREE.Vector3();
  camera.updateMatrixWorld();
  let min = Infinity;
  for (let s = 0; s < 8; s++) {
    spin.setFromAxisAngle(axis, (s * Math.PI) / 4);
    for (let i = 0; i < pos.count; i += 7) {
      v.fromBufferAttribute(pos, i).applyQuaternion(spin).applyMatrix4(m).project(camera);
      if (v.y < min) min = v.y;
    }
  }
  return min;
}

function Scene({ reduced }) {
  const { viewport, size, camera } = useThree();
  const [texSmall, texTall] = useTexture([photo, photoTall], (list) => {
    (Array.isArray(list) ? list : [list]).forEach((t) => {
      t.anisotropy = 8;
    });
  });
  const geometry = useMemo(() => buildRibbon(), []);

  const rollRef = useRef(null); // ring position + on-screen roll
  const ringRef = useRef(null); // tilt, pointer parallax, scale
  const spinRef = useRef(null); // slow spin about the ring's own axis
  const photoRef = useRef(null);
  const matRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const intro = useRef(introPlayed ? 1 : 0);
  // R3F resets its own clock to 0 every time frameloop goes never -> always (hero scrolled out and back),
  // which replayed the intro (photo hidden, ring scaled to 0). So keep our own timer and latch the intro once done.
  const age = useRef(introPlayed ? INTRO_DELAY + 1 : 0);
  const introDone = useRef(introPlayed);
  const frames = useRef(0);

  // shader uniforms (stable objects, updated every frame)
  const uMask = useRef({ value: 0 }); // mobile only: oval mask on the lower torso
  const uClip = useRef({ value: (size.width < 1100 || size.width / size.height < 1.4) ? 0 : 1 }); // desktop: hide the body below the ring's near arc
  const uRes = useRef({ value: new THREE.Vector2(1, 1) });
  const uX = useRef({ value: new THREE.Vector2(-1, 1) });
  const uLow = useRef({ value: new Float32Array(CLIP_N).fill(-2) });

  // planes splitting the ring into far / near halves, along its long axis (updated every frame)
  const backPlane = useMemo(() => new THREE.Plane(), []);
  const frontPlane = useMemo(() => new THREE.Plane(), []);
  const backPlanes = useMemo(() => [backPlane], [backPlane]);
  const frontPlanes = useMemo(() => [frontPlane], [frontPlane]);

  const circle = useMemo(
    () => Array.from({ length: 240 }, (_, i) => new THREE.Vector3(2.2 * Math.cos((i / 240) * Math.PI * 2), 2.2 * Math.sin((i / 240) * Math.PI * 2), 0)),
    []
  );
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const tmpS = useMemo(() => new THREE.Vector3(), []);
  const zero = useMemo(() => new THREE.Vector3(), []);
  const tmpM = useMemo(() => new THREE.Matrix4(), []);
  const tmpM2 = useMemo(() => new THREE.Matrix4(), []);

  useEffect(() => {
    if (reduced) return undefined;
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  const mobile = size.width < 1100 || size.width / size.height < 1.4;
  const tex = mobile ? texSmall : texTall; // desktop: extended torso (clipped by the ring), mobile: original crop
  const W = viewport.width;
  const H = viewport.height;

  // Layout is derived from where the person really is inside the PNG, so any photo works.
  //  desktop: head ~7% from the top; the torso continues below the ring and is clipped by it
  //  mobile:  person stands on the dark/paper split line
  const L = useMemo(() => {
    const img = tex.image;
    const bb = alphaBounds(img);
    const aspect = img.width / img.height;
    const bbH = bb.bottom - bb.top;

    let cx, topY, bottomY, k, ringY;
    if (mobile) {
      cx = 0;
      topY = H * 0.5 - H * 0.08;
      bottomY = H * 0.5 - H * 0.536;
      k = (topY - bottomY) * 0.185;
      ringY = bottomY + (topY - bottomY) * 0.47;
    } else {
      cx = -W * 0.13;
      k = H * 0.14; // ring size
      topY = H * 0.43;
      bottomY = -H * 0.53;
      const target = -H * 0.42; // lowest edge of the ring
      ringY = 0;
      for (let n = 0; n < 3; n++) ringY += target - (ringLowestNdc(geometry, camera, k, ringY) * H) / 2;
    }

    const visH = topY - bottomY;
    const planeH = visH / bbH;
    const planeW = planeH * aspect;
    return {
      cx,
      k,
      ringY,
      visH,
      planeW,
      planeH,
      px: cx - ((bb.left + bb.right) / 2 - 0.5) * planeW,
      py: topY + bb.top * planeH - planeH / 2,
    };
  }, [tex, mobile, W, H, geometry, camera]);

  const patchShader = useCallback((shader) => {
    shader.uniforms.uMask = uMask.current;
    shader.uniforms.uClip = uClip.current;
    shader.uniforms.uRes = uRes.current;
    shader.uniforms.uX = uX.current;
    shader.uniforms.uLow = uLow.current;
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nuniform float uMask;\nuniform float uClip;\nuniform vec2 uRes;\nuniform vec2 uX;\nuniform float uLow[64];")
      .replace(
        "#include <map_fragment>",
        "#include <map_fragment>\n" +
          // mobile: fade the lower torso into a broad oval
          "float bodyX = (vMapUv.x - 0.5) / 0.52;\n" +
          "float bodyY = (vMapUv.y - 0.34) / 0.34;\n" +
          "float bodyInside = 1.0 - smoothstep(0.94, 1.08, bodyX * bodyX + bodyY * bodyY);\n" +
          "float lowerBody = 1.0 - smoothstep(0.48, 0.62, vMapUv.y);\n" +
          "diffuseColor.a *= mix(1.0, bodyInside, lowerBody * uMask);\n" +
          // desktop: hard clip along the ring's lower edge (screen space); the chrome band covers the cut
          "if (uClip > 0.5) {\n" +
          "  vec2 ndc = gl_FragCoord.xy / uRes * 2.0 - 1.0;\n" +
          "  float fx = clamp((ndc.x - uX.x) / max(uX.y - uX.x, 0.0001), 0.0, 1.0) * 63.0;\n" +
          "  int i0 = int(floor(fx));\n" +
          "  int i1 = min(i0 + 1, 63);\n" +
          "  float low = mix(uLow[i0], uLow[i1], fract(fx));\n" +
          "  diffuseColor.a *= smoothstep(low - 0.004, low + 0.004, ndc.y);\n" +
          "}"
      );
  }, []);

  useFrame((state, dt) => {
    // textures are decoded + uploaded and a few frames are on screen: tell the gear loader it can lift
    if (frames.current < 4 && ++frames.current === 4) markHeroReady();
    age.current += Math.min(dt, 0.1);
    const t = age.current;
    const { x: px, y: py } = pointer.current;
    intro.current = THREE.MathUtils.damp(intro.current, introDone.current || (isRevealed() && t > INTRO_DELAY) ? 1 : 0, 2.2, dt);
    if (intro.current > 0.995) {
      introDone.current = true;
      introPlayed = true;
    }
    const p = intro.current;

    uMask.current.value = mobile ? 1 : 0;
    uClip.current.value = mobile ? 0 : 1;
    state.gl.getDrawingBufferSize(uRes.current.value);
    if (matRef.current) matRef.current.opacity = p; // photo stays hidden until the intro starts

    if (photoRef.current) {
      photoRef.current.position.x = THREE.MathUtils.damp(photoRef.current.position.x, L.px + px * L.planeW * 0.012, 4, dt);
      photoRef.current.position.y = L.py - (1 - p) * L.visH * 0.14;
    }

    const roll = rollRef.current;
    const ring = ringRef.current;
    if (!roll || !ring) return;

    roll.position.set(L.cx, L.ringY + (reduced ? 0 : Math.sin(t * 0.8) * L.visH * 0.008), 0);
    if (mobile) ring.scale.setScalar(Math.max(L.k * p, 0.0001));
    else ring.scale.set(L.k * SQUASH[0] * p, L.k * SQUASH[1] * p, L.k * SQUASH[2] * p);
    ring.rotation.y = THREE.MathUtils.damp(ring.rotation.y, px * 0.12, 3, dt);
    ring.rotation.x = THREE.MathUtils.damp(ring.rotation.x, TILT + py * 0.1, 3, dt);
    if (spinRef.current && !reduced) spinRef.current.rotation.z += dt * 0.16;

    // far / near split: a vertical plane through the ring centre along its long axis
    const nx = -Math.sin(ROLL);
    const ny = Math.cos(ROLL);
    const d = nx * roll.position.x + ny * roll.position.y;
    backPlane.normal.set(nx, ny, 0);
    backPlane.constant = -d;
    frontPlane.normal.set(-nx, -ny, 0);
    frontPlane.constant = d;

    if (mobile) return;

    // Screen-space lower edge of the ring's centre-line, one value per x bin (used to clip the body).
    // The ring spins about its own axis, so this circle never moves; it uses the final ring size so
    // the cut is already in place while the ring scales in.
    camera.updateMatrixWorld();
    roll.updateMatrix();
    tmpM.copy(roll.matrix).multiply(tmpM2.compose(zero, ring.quaternion, tmpS.set(L.k * SQUASH[0], L.k * SQUASH[1], L.k * SQUASH[2])));
    let xmin = Infinity;
    let xmax = -Infinity;
    const xs = new Float32Array(circle.length);
    const ys = new Float32Array(circle.length);
    for (let i = 0; i < circle.length; i++) {
      tmp.copy(circle[i]).applyMatrix4(tmpM).project(camera);
      xs[i] = tmp.x;
      ys[i] = tmp.y;
      if (tmp.x < xmin) xmin = tmp.x;
      if (tmp.x > xmax) xmax = tmp.x;
    }
    const low = uLow.current.value;
    if (xmax - xmin < 1e-3) {
      low.fill(-2);
    } else {
      low.fill(Infinity);
      for (let i = 0; i < circle.length; i++) {
        const b = Math.round(((xs[i] - xmin) / (xmax - xmin)) * (CLIP_N - 1));
        if (ys[i] < low[b]) low[b] = ys[i];
      }
      let last = Infinity; // fill empty bins from their neighbours
      for (let i = 0; i < CLIP_N; i++) {
        if (low[i] === Infinity) low[i] = last;
        else last = low[i];
      }
      last = Infinity;
      for (let i = CLIP_N - 1; i >= 0; i--) {
        if (low[i] === Infinity) low[i] = last === Infinity ? -2 : last;
        else last = low[i];
      }
    }
    uX.current.value.set(xmin, xmax);
  });

  return (
    <>
      <Environment resolution={512} frames={1}>
        <color attach="background" args={["#08080a"]} />
        <Lightformer form="rect" intensity={7} position={[0, 6, -4]} scale={[24, 3, 1]} />
        <Lightformer form="rect" intensity={5} position={[-7, 0, 2]} rotation-y={Math.PI / 2} scale={[12, 4, 1]} />
        <Lightformer form="rect" intensity={4} position={[7, 1, 3]} rotation-y={-Math.PI / 2} scale={[12, 2, 1]} />
        <Lightformer form="ring" intensity={2.5} color="#ff6a2b" position={[0, -4, 4]} scale={7} />
        <Lightformer form="rect" intensity={1.5} position={[0, -6, 0]} rotation-x={Math.PI / 2} scale={[24, 24, 1]} />
      </Environment>

      {/* photo: drawn after the far half of the ring and before the near half (renderOrder), no depth test */}
      <mesh ref={photoRef} position={[L.px, L.py, 0]} renderOrder={1}>
        <planeGeometry args={[L.planeW, L.planeH]} />
        <meshBasicMaterial ref={matRef} map={tex} transparent opacity={0} alphaTest={0.025} depthTest={false} depthWrite={false} toneMapped={false} onBeforeCompile={patchShader} />
      </mesh>

      {/* ring: roll (diagonal) -> tilt -> spin */}
      <group ref={rollRef} position={[L.cx, L.ringY, 0]} rotation={[0, 0, ROLL]}>
        <group ref={ringRef} rotation={[TILT, 0, 0]} scale={0.0001}>
          <group ref={spinRef}>
            <mesh geometry={geometry} renderOrder={0}>
              <meshPhysicalMaterial {...RING_MAT} side={THREE.DoubleSide} clippingPlanes={backPlanes} />
            </mesh>
            <mesh geometry={geometry} renderOrder={2}>
              <meshPhysicalMaterial {...RING_MAT} side={THREE.DoubleSide} transparent clippingPlanes={frontPlanes} />
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
}

export default function HeroScene({ active = true, reduced = false }) {
  // Browsers (mobile above all) drop the WebGL context of an off-screen canvas. Three.js can restore it, but the
  // one-shot environment map and render state come back blank, so the photo + ring stayed gone after scrolling
  // back up. A fresh Canvas (new key) always draws correctly, so remount whenever the context is lost.
  const [epoch, setEpoch] = useState(0);
  const glRef = useRef(null);
  const remounts = useRef(0);

  const remount = useCallback(() => {
    if (remounts.current >= 6) return; // never loop forever on a broken GPU
    remounts.current += 1;
    setEpoch((n) => n + 1);
  }, []);

  // coming back into view: make sure the context survived, otherwise rebuild the canvas
  useEffect(() => {
    if (!active) return undefined;
    const id = requestAnimationFrame(() => {
      if (glRef.current && glRef.current.getContext().isContextLost()) remount();
    });
    return () => cancelAnimationFrame(id);
  }, [active, remount]);

  return (
    <Canvas
      key={epoch}
      frameloop={active ? "always" : "never"}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 10], fov: 35, near: 0.1, far: 50 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance", localClippingEnabled: true }}
      style={{ pointerEvents: "none" }}
      onCreated={({ gl }) => {
        gl.localClippingEnabled = true; // needed for the clipping planes on the two ring halves
        glRef.current = gl;
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          setTimeout(remount, 120);
        });
      }}
    >
      <Scene reduced={reduced} />
    </Canvas>
  );
}