import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Dhanendra from "../../assets/dhruv-neww.png";
import "./hero.css";

const HeroScene = lazy(() => import("./HeroScene"));

const INTRO = 2.4; // gear loader runs ~2.3s + exit
const EASE = [0.16, 1, 0.3, 1];

const NAV = [
  { n: "01", label: "Work", href: "#project" },
  { n: "02", label: "About", to: "/About" },
  { n: "03", label: "Services", to: "/Services" },
  { n: "04", label: "Contact", to: "/Contact" },
];

const TITLE = ["Builder of", "Useful", "Products"];

// If WebGL is unavailable the plain cutout photo is shown instead of a blank hero.
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const Hero = () => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(true);

  // pause the WebGL loop when the hero is scrolled out of view
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // scroll parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yD = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const yC = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const yDisc = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const yCopy = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // mouse parallax
  const mx = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const xD = useTransform(sx, (v) => v * -16);
  const xC = useTransform(sx, (v) => v * 14);
  const xDisc = useTransform(sx, (v) => v * 26);

  useEffect(() => {
    if (reduced) return undefined;
    const onMove = (e) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, mx]);

  const par = (style) => (reduced ? undefined : style);
  const fade = (delay, y = 0) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: EASE, delay: INTRO + delay },
  });

  const photoFallback = <img className="hero__photo-fallback" src={Dhanendra} alt="Dhanendra Choudhary" />;

  return (
    <section ref={ref} className="hero" aria-label="Introduction">
      {/* background typography + disc */}
      <motion.div className="hero__letter hero__letter--d" aria-hidden="true" style={par({ x: xD, y: yD })}>
        <motion.span style={{ display: "block" }} {...fade(0.1, 60)}>D</motion.span>
      </motion.div>

      <motion.div className="hero__letter hero__letter--c" aria-hidden="true" style={par({ x: xC, y: yC })}>
        <motion.span style={{ display: "block" }} {...fade(0.3, 80)}>C</motion.span>
      </motion.div>

      <motion.div
        className="hero__disc"
        aria-hidden="true"
        style={par({ x: xDisc, y: yDisc })}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.3, ease: EASE, delay: INTRO }}
      />

      {/* photo + 3D ring */}
      <div className="hero__stage">
        <SceneBoundary fallback={photoFallback}>
          <Suspense fallback={photoFallback}>
            <HeroScene active={inView} reduced={!!reduced} />
          </Suspense>
        </SceneBoundary>
      </div>

      {/* chrome */}
      <motion.a href="/" className="hero__logo" aria-label="Home" {...fade(0.2)}>
        DC<i>.</i>
      </motion.a>

      <motion.nav className="hero__nav" aria-label="Sections" {...fade(0.4)}>
        <div className="hero__nav-line" style={{ height: "10vh" }} />
        <ul>
          {NAV.map((item, i) => {
            const inner = (
              <>
                <span>{item.n}</span>
                <span>{item.label}</span>
                <em />
              </>
            );
            return (
              <li key={item.n}>
                {item.to ? (
                  <Link to={item.to} data-active={i === 0 ? "true" : undefined}>{inner}</Link>
                ) : (
                  <a href={item.href} data-active={i === 0 ? "true" : undefined}>{inner}</a>
                )}
              </li>
            );
          })}
        </ul>
        <div className="hero__nav-line" style={{ height: "18vh" }} />
        <a href="#project" className="hero__scroll" aria-label="Scroll to projects" />
      </motion.nav>

      <motion.div className="hero__label" {...fade(0.5)}>
        Portfolio<br />/ 2026
      </motion.div>

      {/* copy */}
      <motion.div className="hero__copy" style={par({ y: yCopy })}>
        <motion.div className="hero__name" {...fade(0.2)}>Dhanendra Choudhary</motion.div>

        <h1 className="hero__title">
          {TITLE.map((line, i) => (
            <span className="line" key={line}>
              <motion.span
                style={{ display: "block" }}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: INTRO + 0.25 + i * 0.12 }}
              >
                {i === 2 ? <em>{line}</em> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p className="hero__sub" {...fade(0.8, 20)}>
          Full-Stack Developer &amp; Product Maker — building seamless web, desktop and mobile
          software that turns real problems into thoughtful products.
        </motion.p>
      </motion.div>

      <motion.a href="#project" className="hero__cta" {...fade(1)}>
        <ArrowDownRight aria-hidden="true" />
        <span>
          Explore<br />my work
        </span>
      </motion.a>

      <div className="hero__grain" aria-hidden="true" />
    </section>
  );
};

export default Hero;
