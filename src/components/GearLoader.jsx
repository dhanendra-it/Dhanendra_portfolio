import { useEffect, useRef, useState } from "react";
import { isHeroReady, markHeroReady, reveal } from "../introGate";
import "./GearLoader.css";

/*
 * Steampunk pendant loader (reference: hanging riveted gear with brass movement inside).
 *
 *  - the pendant drops on its rope, settles, then swings gently
 *  - the brass / steel gears inside turn against each other (the riveted rim stays still)
 *  - the bar is driven by real milestones: page `load`, then the hero portrait + 3D scene having actually drawn
 *  - when both are done the pendant is pulled up on its rope and the dark curtain lifts, revealing a finished hero
 */

const CX = 200; // gear centre in the 400 x 490 viewBox
const CY = 310;
const VB_W = 400;
const VB_H = 490;

const fix = (n) => Number(n.toFixed(2));

// toothed wheel centred on 0,0 : n teeth, outer radius ro, root radius rr
function gearPath(n, ro, rr) {
  const step = (Math.PI * 2) / n;
  const wRoot = step * 0.56;
  const wTop = step * 0.3;
  const pt = (r, a) => `${fix(Math.cos(a) * r)} ${fix(Math.sin(a) * r)}`;
  let d = "";
  for (let i = 0; i < n; i += 1) {
    const a = i * step;
    d += `${i === 0 ? "M" : "L"}${pt(rr, a - wRoot / 2)} L${pt(ro, a - wTop / 2)} L${pt(ro, a + wTop / 2)} L${pt(rr, a + wRoot / 2)} `;
    d += `A${rr} ${rr} 0 0 1 ${pt(rr, a + step - wRoot / 2)} `;
  }
  return `${d}Z`;
}

const polar = (r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [fix(CX + Math.cos(a) * r), fix(CY + Math.sin(a) * r)];
};

// inner movement: x/y are offsets from the hub; dir = 1 clockwise, -1 counter; seconds per turn follow the tooth count
const MOVEMENT = [
  { id: "a", teeth: 14, ro: 41, rr: 34, at: [62, -40], face: "brass", dir: 1, sec: 14 * 0.62 },
  { id: "b", teeth: 11, ro: 30, rr: 24.5, at: [66, -150], face: "steel", dir: -1, sec: 11 * 0.62 },
  { id: "c", teeth: 12, ro: 32, rr: 26, at: [64, 150], face: "brass", dir: 1, sec: 12 * 0.62 },
  { id: "d", teeth: 10, ro: 28, rr: 22.5, at: [64, 40], face: "steel", dir: -1, sec: 10 * 0.62 },
].map((g) => ({ ...g, pos: polar(g.at[0], g.at[1]), path: gearPath(g.teeth, g.ro, g.rr) }));

const TEETH_ANGLES = Array.from({ length: 12 }, (_, i) => i * 30 + 15); // top (0 deg) is left free for the hanger

// Teeth as absolute-coordinate bevelled plates. (No transform attribute: userSpaceOnUse light gradients
// would otherwise be evaluated in each tooth's own rotated frame and every tooth would light up the same.)
const TOOTH = [[-22, -134], [-22, -166], [-18, -170], [18, -170], [22, -166], [22, -134]];
const TEETH_D = TEETH_ANGLES.map((deg) => {
  const a = (deg * Math.PI) / 180;
  const c = Math.cos(a);
  const sn = Math.sin(a);
  return `${TOOTH.map(([x, y], i) => `${i ? "L" : "M"}${fix(CX + x * c - y * sn)} ${fix(CY + x * sn + y * c)}`).join(" ")}Z`;
}).join(" ");
const RIVET_ANGLES = TEETH_ANGLES;

const Defs = () => (
  <defs>
    {/* one light source (top-left) for the whole pendant */}
    <linearGradient id="gl-light" gradientUnits="userSpaceOnUse" x1="60" y1="140" x2="340" y2="480">
      <stop offset="0" stopColor="#ffffff" />
      <stop offset=".5" stopColor="#808080" />
      <stop offset="1" stopColor="#000000" />
    </linearGradient>
    <linearGradient id="gl-edge" gradientUnits="userSpaceOnUse" x1="60" y1="140" x2="340" y2="480">
      <stop offset="0" stopColor="#fff3d4" />
      <stop offset=".5" stopColor="#8a7a63" />
      <stop offset="1" stopColor="#1a1612" />
    </linearGradient>
    <linearGradient id="gl-edge-rev" gradientUnits="userSpaceOnUse" x1="60" y1="140" x2="340" y2="480">
      <stop offset="0" stopColor="#0c0907" />
      <stop offset=".55" stopColor="#4b3b2a" />
      <stop offset="1" stopColor="#d9b784" />
    </linearGradient>
    <linearGradient id="gl-brass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#ffe6a6" />
      <stop offset=".4" stopColor="#e2a744" />
      <stop offset=".75" stopColor="#9b6521" />
      <stop offset="1" stopColor="#5b380f" />
    </linearGradient>
    <linearGradient id="gl-steel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#f0ece4" />
      <stop offset=".4" stopColor="#aaa59b" />
      <stop offset=".75" stopColor="#6a665f" />
      <stop offset="1" stopColor="#34312d" />
    </linearGradient>
    <linearGradient id="gl-leather" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#0f0c0a" />
      <stop offset=".35" stopColor="#3a332d" />
      <stop offset=".6" stopColor="#2a2420" />
      <stop offset="1" stopColor="#0c0a08" />
    </linearGradient>
    <linearGradient id="gl-cyl" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#000" stopOpacity=".6" />
      <stop offset=".28" stopColor="#fff" stopOpacity=".16" />
      <stop offset=".55" stopColor="#000" stopOpacity="0" />
      <stop offset="1" stopColor="#000" stopOpacity=".62" />
    </linearGradient>

    {/* rotation-invariant faces for the turning wheels */}
    <radialGradient id="gl-brass-face" cx=".5" cy=".5" r=".5">
      <stop offset="0" stopColor="#f7d487" />
      <stop offset=".55" stopColor="#dba03b" />
      <stop offset=".85" stopColor="#a56a22" />
      <stop offset="1" stopColor="#68400f" />
    </radialGradient>
    <radialGradient id="gl-steel-face" cx=".5" cy=".5" r=".5">
      <stop offset="0" stopColor="#d8d3c9" />
      <stop offset=".55" stopColor="#9a958b" />
      <stop offset=".85" stopColor="#625e57" />
      <stop offset="1" stopColor="#3a3733" />
    </radialGradient>
    <radialGradient id="gl-rivet" cx=".35" cy=".3" r=".85">
      <stop offset="0" stopColor="#fff4d0" />
      <stop offset=".45" stopColor="#c19556" />
      <stop offset="1" stopColor="#3f2b14" />
    </radialGradient>
    <radialGradient id="gl-recess" cx=".5" cy=".5" r=".5">
      <stop offset="0" stopColor="#1d1510" />
      <stop offset=".78" stopColor="#0d0907" />
      <stop offset="1" stopColor="#000" />
    </radialGradient>
    <radialGradient id="gl-ao" cx=".5" cy=".5" r=".5">
      <stop offset=".62" stopColor="#000" stopOpacity="0" />
      <stop offset="1" stopColor="#000" stopOpacity=".75" />
    </radialGradient>
    <radialGradient id="gl-hub" cx=".38" cy=".32" r=".8">
      <stop offset="0" stopColor="#e9e5dc" />
      <stop offset=".5" stopColor="#8a857c" />
      <stop offset="1" stopColor="#2b2824" />
    </radialGradient>

    {/* twisted rope */}
    <pattern id="gl-rope" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)">
      <rect width="9" height="9" fill="#a8783a" />
      <rect width="9" height="4" fill="#e6bd78" />
      <rect y="4" width="9" height="1.4" fill="#4a2f12" />
    </pattern>

    {/* shapes shared between fill / lighting / edge passes (no paint attributes on purpose) */}
    <g id="gl-teeth">
      <path d={TEETH_D} />
    </g>
    <g id="gl-silhouette">
      <use href="#gl-teeth" />
      <circle cx={CX} cy={CY} r="141" />
    </g>
    <g id="gl-rivet-g">
      <circle r="5.4" fill="url(#gl-rivet)" stroke="#2b1f12" strokeWidth="1" />
      <path d="M-3.2 .6 L3.2 -.6" stroke="#2b1f12" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="-1.6" cy="-2" r="1.1" fill="#fff8e0" opacity=".7" />
    </g>
  </defs>
);

const Rivet = ({ x, y, rot = 0, s = 1 }) => <use href="#gl-rivet-g" transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} />;

/* everything that stays still: hanger, riveted rim, teeth, recess, wheel shadows */
const PendantStatic = () => (
  <svg className="gear-loader__layer" viewBox={`0 0 ${VB_W} ${VB_H}`} aria-hidden="true">
    <Defs />

    {/* teeth, then the rim disc over their roots */}
    <use href="#gl-teeth" fill="#6b6253" stroke="url(#gl-edge)" strokeWidth="2" strokeLinejoin="round" />
    {TEETH_ANGLES.map((a) => (
      <g key={a} transform={`translate(${CX} ${CY}) rotate(${a})`}>
        <rect x="-16" y="-164" width="32" height="24" rx="3" fill="rgba(0,0,0,.16)" stroke="rgba(255,238,200,.3)" strokeWidth="1.3" />
      </g>
    ))}
    <circle cx={CX} cy={CY} r="141" fill="#6b6253" stroke="url(#gl-edge)" strokeWidth="2.4" />
    <circle cx={CX} cy={CY} r="137" fill="none" stroke="#000" strokeOpacity=".4" strokeWidth="1.2" />
    <circle cx={CX} cy={CY} r="134" fill="none" stroke="rgba(255,240,210,.16)" strokeWidth="1.4" />
    <circle cx={CX} cy={CY} r="118" fill="none" stroke="#000" strokeOpacity=".35" strokeWidth="1.4" />
    {/* one light source: shade + highlight over teeth and rim together */}
    <use href="#gl-silhouette" fill="url(#gl-light)" opacity=".9" style={{ mixBlendMode: "overlay" }} />

    {RIVET_ANGLES.map((a) => {
      const [x, y] = polar(126, a);
      return <Rivet key={a} x={x} y={y} rot={a * 3} />;
    })}

    {/* recess holding the movement */}
    <circle cx={CX} cy={CY} r="112" fill="url(#gl-recess)" />
    <circle cx={CX} cy={CY} r="111" fill="none" stroke="url(#gl-edge-rev)" strokeWidth="4" />
    <circle cx={CX} cy={CY} r="100" fill="none" stroke="#3a2c1c" strokeOpacity=".55" strokeWidth="1.2" />
    {MOVEMENT.map((g) => (
      <circle key={g.id} cx={g.pos[0] + 4} cy={g.pos[1] + 5} r={g.ro + 1} fill="#000" opacity=".5" />
    ))}
    <circle cx={CX + 3} cy={CY + 4} r="35" fill="#000" opacity=".55" />

    {/* hanger: rope knot, leather strap, bolted bracket, brass ring */}
    <path d="M184 52 h32 v56 q0 14 -9 14 h-14 q-9 0 -9 -14 z" fill="url(#gl-leather)" stroke="#080605" strokeWidth="1.2" />
    <path d="M189 56 v52 M211 56 v52" stroke="#7a6650" strokeWidth="1" strokeDasharray="3 3" opacity=".7" />
    <path d="M192 134 h16 l2 24 q9 4 11 14 v14 h-42 v-14 q2 -10 11 -14 z" fill="url(#gl-steel)" stroke="#1c1a17" strokeWidth="1.2" />
    <path d="M192 134 h16 l2 24 q9 4 11 14 v14 h-42 v-14 q2 -10 11 -14 z" fill="url(#gl-light)" opacity=".4" style={{ mixBlendMode: "overlay" }} />
    <Rivet x="200" y="150" rot="30" s=".8" />
    <Rivet x="186" y="176" rot="75" s=".8" />
    <Rivet x="214" y="176" rot="10" s=".8" />
    <rect x="186" y="58" width="28" height="22" rx="2.5" fill="url(#gl-steel)" stroke="#1c1a17" strokeWidth="1.2" />
    <Rivet x="200" y="64" rot="40" s=".7" />
    <Rivet x="200" y="75" rot="120" s=".7" />
    <rect x="180" y="4" width="40" height="50" rx="9" fill="url(#gl-rope)" stroke="#2b1a08" strokeWidth="1.3" />
    <path d="M180 17 Q200 24 220 17 M180 30 Q200 37 220 30 M180 43 Q200 50 220 43" fill="none" stroke="#2b1a08" strokeOpacity=".55" strokeWidth="1.6" />
    <rect x="180" y="4" width="40" height="50" rx="9" fill="url(#gl-cyl)" />
    <circle cx="200" cy="122" r="17" fill="none" stroke="#2b1a08" strokeWidth="9.4" />
    <circle cx="200" cy="122" r="17" fill="none" stroke="url(#gl-brass)" strokeWidth="7" />
    <path d="M186 114 A15.5 15.5 0 0 1 203 106.6" fill="none" stroke="#fff3c4" strokeOpacity=".85" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const Wheel = ({ g }) => {
  const holes = Array.from({ length: 5 }, (_, i) => (i * 360) / 5);
  const face = g.face === "brass" ? "url(#gl-brass-face)" : "url(#gl-steel-face)";
  const dark = g.face === "brass" ? "#3d2508" : "#26231f";
  return (
    <g transform={`translate(${g.pos[0]} ${g.pos[1]})`}>
      <g
        className="gear-loader__wheel"
        style={{ animationDuration: `${g.sec}s`, animationDirection: g.dir === 1 ? "normal" : "reverse" }}
      >
        <path d={g.path} fill={face} stroke={dark} strokeWidth="1.1" strokeLinejoin="round" />
        <circle r={g.rr - 3.5} fill="none" stroke="rgba(255,240,200,.28)" strokeWidth="1.1" />
        <circle r={g.rr * 0.66} fill="none" stroke={dark} strokeOpacity=".7" strokeWidth="1.6" />
        {holes.map((a) => (
          <circle key={a} cx={Math.cos((a * Math.PI) / 180) * g.rr * 0.47} cy={Math.sin((a * Math.PI) / 180) * g.rr * 0.47} r={g.rr * 0.12} fill="#150e07" />
        ))}
        <circle r={g.rr * 0.24} fill="url(#gl-steel)" stroke={dark} strokeWidth="1" />
        <circle r={g.rr * 0.08} fill="#2a1c0c" />
      </g>
    </g>
  );
};

/* the turning movement, on its own layer so only this small SVG repaints each frame */
const PendantMovement = () => (
  <svg className="gear-loader__layer" viewBox={`0 0 ${VB_W} ${VB_H}`} aria-hidden="true">
    <defs>
      <clipPath id="gl-clip">
        <circle cx={CX} cy={CY} r="111" />
      </clipPath>
    </defs>
    <g clipPath="url(#gl-clip)">
      {MOVEMENT.map((g) => (
        <Wheel key={g.id} g={g} />
      ))}
    </g>

    {/* hub */}
    <g transform={`translate(${CX} ${CY})`}>
      <circle r="36" fill="#000" opacity=".5" transform="translate(2 3)" />
      <circle r="35" fill="url(#gl-hub)" stroke="#1b1916" strokeWidth="1.4" />
      <g className="gear-loader__wheel gear-loader__wheel--hub">
        <circle r="28" fill="none" stroke="url(#gl-brass)" strokeWidth="3.4" />
        {Array.from({ length: 6 }, (_, i) => {
          const a = (i * Math.PI) / 3;
          return <circle key={i} cx={fix(Math.cos(a) * 28)} cy={fix(Math.sin(a) * 28)} r="2.6" fill="url(#gl-rivet)" stroke="#2b1f12" strokeWidth=".7" />;
        })}
        <circle r="19" fill="#17120d" stroke="#6f5330" strokeWidth="1.4" />
        <circle r="13.5" fill="url(#gl-brass)" stroke="#3d2508" strokeWidth="1.2" />
        <path d="M-9 0 H9 M0 -9 V9" stroke="#3d2508" strokeWidth="1.6" strokeLinecap="round" opacity=".7" />
      </g>
      <circle r="5" fill="#efe9dc" stroke="#3d2508" strokeWidth="1" />
    </g>

    {/* lighting over the whole movement so it matches the rim */}
    <circle cx={CX} cy={CY} r="111" fill="url(#gl-light)" opacity=".42" style={{ mixBlendMode: "overlay" }} />
    <circle cx={CX} cy={CY} r="111" fill="url(#gl-ao)" />
    <path d="M122 255 A92 92 0 0 1 186 222" fill="none" stroke="#fff4d8" strokeOpacity=".16" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

// a few slow motes of dust in the warm light
const DUST = Array.from({ length: 16 }, (_, i) => ({
  left: 12 + ((i * 37) % 76),
  size: 1 + ((i * 7) % 3) * 0.7,
  delay: -((i * 1.7) % 12),
  dur: 9 + ((i * 5) % 8),
  drift: ((i * 13) % 40) - 20,
}));

export default function GearLoader() {
  const [phase, setPhase] = useState("drop");
  const [visible, setVisible] = useState(true);
  const fillRef = useRef(null);

  useEffect(() => {
    const MIN = 2200; // never flash: the pendant always gets its moment
    const MAX = 9500; // never trap the visitor behind the loader
    const start = performance.now();
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden"; // the page behind stays put until the loader has lifted

    // "loaded" = window load AND the hero web fonts are in, so the headline never swaps typeface after the reveal
    let pageLoaded = false;
    const loadFonts = () => {
      if (!document.fonts || !document.fonts.load) {
        pageLoaded = true;
        return;
      }
      // at window `load` the Google Fonts stylesheet is parsed, so these requests are real
      Promise.all(['1em "Instrument Serif"', 'italic 1em "Instrument Serif"', '1em "DM Sans"', '1em "Outfit"'].map((f) => document.fonts.load(f)))
        .catch(() => {})
        .finally(() => {
          pageLoaded = true;
        });
    };
    if (document.readyState === "complete") loadFonts();
    else window.addEventListener("load", loadFonts, { once: true });

    // on any other route there is no hero to wait for
    if (window.location.pathname !== "/") markHeroReady();

    let raf = 0;
    let shown = 0;
    let last = start;
    let leaving = false;
    const timers = [];

    const leave = () => {
      leaving = true;
      setPhase("retract");
      timers.push(window.setTimeout(reveal, 380)); // hero entrance starts as the curtain begins to rise
      timers.push(
        window.setTimeout(() => {
          root.style.overflow = prevOverflow;
          setVisible(false);
        }, 1500)
      );
    };

    const tick = (now) => {
      const el = now - start;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      const ready = pageLoaded && isHeroReady();
      const cap = 0.5 + (pageLoaded ? 0.26 : 0);
      let target = cap * (1 - Math.exp(-el / 1500));
      if (ready) target = Math.max(target, Math.min(1, el / MIN));
      if (el >= MAX) target = 1;

      shown += (target - shown) * Math.min(1, dt * 5);
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${shown.toFixed(4)})`;

      if (target === 1 && shown > 0.992 && !leaving) {
        if (fillRef.current) fillRef.current.style.transform = "scaleX(1)";
        timers.push(window.setTimeout(leave, 280)); // let the bar visibly finish
        leaving = true;
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(window.clearTimeout);
      window.removeEventListener("load", loadFonts);
      root.style.overflow = prevOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`gear-loader gear-loader--${phase}`} role="status" aria-label="Loading portfolio">
      <div className="gear-loader__grain" />
      <div className="gear-loader__vignette" />
      <div className="gear-loader__dust" aria-hidden="true">
        {DUST.map((d, i) => (
          <span
            key={i}
            style={{ left: `${d.left}%`, width: d.size, height: d.size, animationDelay: `${d.delay}s`, animationDuration: `${d.dur}s`, "--drift": `${d.drift}px` }}
          />
        ))}
      </div>
      <div className="gear-loader__glow" aria-hidden="true" />

      <div className="gear-loader__pendant" aria-hidden="true">
        <div className="gear-loader__swing">
          <span className="gear-loader__rope" />
          <div className="gear-loader__body">
            <PendantStatic />
            <PendantMovement />
          </div>
        </div>
      </div>

      <span className="gear-loader__caption" aria-hidden="true">A MOMENT, PLEASE</span>
      <div className="gear-loader__bar" aria-hidden="true">
        <i ref={fillRef} />
      </div>
    </div>
  );
}
