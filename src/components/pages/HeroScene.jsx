import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useTexture } from "@react-three/drei";
import * as THREE from "three";
import photo from "../../assets/dhruv-neww.png";

const PHOTO_ASPECT = 440 / 541;
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
    const a = 0.46 + 0.2 * Math.cos(u); // ribbon half-width, varies around the loop
    const b = 0.075; // half-thickness

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

function Scene({ reduced }) {
  const { viewport, size } = useThree();
  const tex = useTexture(photo, (t) => {
    t.anisotropy = 8;
  });
  const geometry = useMemo(() => buildRibbon(), []);

  const ringRef = useRef(null);
  const spinRef = useRef(null);
  const photoRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const intro = useRef(0);

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

  // person: bottom-anchored on desktop (cropped by the viewport edge), floating on mobile
  const personH = mobile ? H * 0.46 : H * 0.84;
  const personW = personH * PHOTO_ASPECT;
  const cx = mobile ? 0 : -W * 0.13;
  const cy = mobile ? H / 2 - H * 0.08 - personH / 2 : -H / 2 + personH / 2;
  const ringY = cy - personH / 2 + personH * 0.47;
  const ringScale = personH * 0.185;

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const { x: px, y: py } = pointer.current;
    intro.current = THREE.MathUtils.damp(intro.current, t > INTRO_DELAY ? 1 : 0, 2.2, dt);
    const p = intro.current;

    if (photoRef.current) {
      photoRef.current.position.x = THREE.MathUtils.damp(photoRef.current.position.x, cx + px * personW * 0.012, 4, dt);
      photoRef.current.position.y = cy - (1 - p) * personH * 0.14;
    }

    const ring = ringRef.current;
    if (ring) {
      ring.scale.setScalar(Math.max(ringScale * p, 0.0001));
      ring.position.x = cx;
      ring.position.y = ringY + (reduced ? 0 : Math.sin(t * 0.8) * personH * 0.008);
      ring.rotation.y = THREE.MathUtils.damp(ring.rotation.y, px * 0.3, 3, dt);
      ring.rotation.x = THREE.MathUtils.damp(ring.rotation.x, -1.0 + py * 0.12, 3, dt);
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

      <mesh ref={photoRef} position={[cx, cy, 0]}>
        <planeGeometry args={[personW, personH]} />
        <meshBasicMaterial map={tex} alphaTest={0.5} alphaToCoverage toneMapped={false} />
      </mesh>

      {/* the ring passes through the photo plane, so depth decides front/back — no layer hacks */}
      <group ref={ringRef} rotation={[-1.0, 0, 0.5]} position={[cx, ringY, 0]}>
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
