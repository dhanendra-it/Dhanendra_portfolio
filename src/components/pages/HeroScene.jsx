import { useCallback, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useTexture } from "@react-three/drei";
import * as THREE from "three";
import photo from "../../assets/dhruv-neww.png";

const RING_ROT = new THREE.Euler(-0.96, 0, 0.9);
const INTRO_DELAY = 2.4; // seconds — waits for the gear loader to finish

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
    const a = 0.34 + 0.12 * Math.cos(u); // slimmer ribbon, closer to the reference
    const b = 0.052; // thinner chrome edge

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

/** Lowest point of the ring on screen (NDC y), over a full spin, for a ring centred at (0, posY). */
function ringLowestNdc(geo, camera, scale, posY) {
  const pos = geo.attributes.position;
  const q = new THREE.Quaternion().setFromEuler(RING_ROT);
  const m = new THREE.Matrix4().compose(new THREE.Vector3(0, 0, 0), q, new THREE.Vector3(scale * 1.2, scale * 0.84, scale * 0.92));
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
  const tex = useTexture(photo, (t) => {
    t.anisotropy = 8;
  });
  const geometry = useMemo(() => buildRibbon(), []);

  const ringRef = useRef(null);
  const spinRef = useRef(null);
  const photoRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const intro = useRef(0);
  const uFade = useRef({ value: new THREE.Vector2(-1, -0.5) });

  useEffect(() => {
    if (reduced) return undefined;
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  const mobile = size.width < 1024;
  const W = viewport.width;
  const H = viewport.height;

  // Layout is derived from where the person actually is inside the PNG, so any photo works:
  //  desktop – head ~11% from the top, body ends exactly at the ring's lowest edge (soft fade)
  //  mobile  – person stands on the dark/paper split line
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
      k = H * 0.135;
      // Keep the head near the same top anchor while showing more of the torso.
      topY = H * 0.5 - H * 0.05;
      const target = -H * 0.43;
      // Crop the visible portrait higher: no lower torso should spill below the chrome loop.
      bottomY = -H * 0.25;

      // A narrower, more diagonal chrome loop sits around the lower torso.
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
      // alpha fade (texture v, 0 = bottom of image) over the last part of the body on desktop
      fade: mobile ? [-1, -0.5] : [1 - bb.bottom, 1 - bb.bottom + bbH * 0.035],
    };
  }, [tex, mobile, W, H, geometry, camera]);

  const patchFade = useCallback((shader) => {
    shader.uniforms.uFade = uFade.current;
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nuniform vec2 uFade;")
      .replace(
        "#include <map_fragment>",
        "#include <map_fragment>\n" +
          "diffuseColor.a *= smoothstep(uFade.x, uFade.y, vMapUv.y);\n" +
          // Keep the lower torso inside a soft oval aperture; leave the head/shoulders natural.
          "float bodyX = (vMapUv.x - 0.5) / 0.47;\n" +
          "float bodyY = (vMapUv.y - 0.30) / 0.33;\n" +
          "float bodyEllipse = bodyX * bodyX + bodyY * bodyY;\n" +
          "float bodyInside = 1.0 - smoothstep(0.92, 1.04, bodyEllipse);\n" +
          "float lowerBody = 1.0 - smoothstep(0.48, 0.62, vMapUv.y);\n" +
          "diffuseColor.a *= mix(1.0, bodyInside, lowerBody);"
      );
  }, []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const { x: px, y: py } = pointer.current;
    intro.current = THREE.MathUtils.damp(intro.current, t > INTRO_DELAY ? 1 : 0, 2.2, dt);
    const p = intro.current;
    uFade.current.value.set(L.fade[0], L.fade[1]);

    if (photoRef.current) {
      photoRef.current.position.x = THREE.MathUtils.damp(photoRef.current.position.x, L.px + px * L.planeW * 0.012, 4, dt);
      photoRef.current.position.y = L.py - (1 - p) * L.visH * 0.14;
    }

    const ring = ringRef.current;
    if (ring) {
      if (mobile) {
        ring.scale.setScalar(Math.max(L.k * p, 0.0001));
      } else {
        // A wider, flatter orbit reads as an elongated diagonal ribbon, not a collar.
        ring.scale.set(L.k * 1.2 * p, L.k * 0.84 * p, L.k * 0.92 * p);
      }
      ring.position.x = L.cx;
      ring.position.y = L.ringY + (reduced ? 0 : Math.sin(t * 0.8) * L.visH * 0.008);
      ring.rotation.y = THREE.MathUtils.damp(ring.rotation.y, px * 0.3, 3, dt);
      ring.rotation.x = THREE.MathUtils.damp(ring.rotation.x, RING_ROT.x + py * 0.12, 3, dt);
    }
    if (spinRef.current && !reduced) spinRef.current.rotation.z += dt * 0.16;
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

      {/* transparent plane drawn after the opaque ring: depth-test decides what is in front/behind */}
      <mesh ref={photoRef} position={[L.px, L.py, 0]}>
        <planeGeometry args={[L.planeW, L.planeH]} />
        <meshBasicMaterial map={tex} transparent alphaTest={0.025} depthWrite toneMapped={false} onBeforeCompile={patchFade} />
      </mesh>

      {/* the ring passes through the photo plane, so depth decides front/back — no layer hacks */}
      <group ref={ringRef} rotation={[RING_ROT.x, RING_ROT.y, RING_ROT.z]} position={[L.cx, L.ringY, 0]}>
        <group ref={spinRef}>
          <mesh geometry={geometry}>
            <meshPhysicalMaterial
              color="#d8d9de"
              metalness={1}
              roughness={0.1}
              clearcoat={0.6}
              clearcoatRoughness={0.08}
              envMapIntensity={1.7}
            />
          </mesh>
        </group>
      </group>
    </>
  );
}

export default function HeroScene({ active = true, reduced = false }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 10], fov: 35, near: 0.1, far: 50 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Scene reduced={reduced} />
    </Canvas>
  );
}
