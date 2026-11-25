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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Dhanendra from "../../assets/dhruv-neww.webp";
import { isRevealed, markHeroReady, subscribe, useRevealed } from "../../introGate";
import "./hero.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HeroScene = lazy(() => import("./HeroScene"));

const INTRO = 0.15; // seconds after the gear loader starts lifting away (see introGate.js)
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
  const revealed = useRevealed(); // flips when the gear loader lifts: entrance animations start from here

  // pause the WebGL loop when the hero is scrolled out of view
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (!entry.isIntersecting) markHeroReady(); // page restored further down: nothing to wait for in the hero
      },
      { threshold: 0, rootMargin: "240px 0px" }
    );
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

  // GSAP: only touches elements framer-motion doesn't animate (nav <li>, stage wrapper, copy wrapper, CTA arrow)
  useEffect(() => {
    if (reduced) return undefined;
    let unsub = null;
    const ctx = gsap.context(() => {
      // entrance tweens: they wait for the gear loader to lift (reveal), so nothing plays behind it
      const playIntro = () => {
        // nav links slide in one by one
        gsap.from(".hero__nav li", { x: -28, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: INTRO + 0.55 });

        // scroll dot pops in (the label is already animated by framer-motion, so GSAP stays off it)
        gsap.from(".hero__scroll", { scale: 0, opacity: 0, duration: 0.7, ease: "back.out(2)", delay: INTRO + 1.2 });

        // CTA arrow keeps nudging towards the next section
        gsap.to(".hero__cta svg", { x: 5, y: 5, duration: 0.9, ease: "sine.inOut", yoyo: true, repeat: -1, delay: INTRO + 1.6 });

        // hairline next to the name draws itself in
        gsap.from(".hero__rule", { scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power3.inOut", delay: INTRO + 0.7 });

        // portrait + ring keep a gentle float so the hero never looks frozen (touch screens have no pointer parallax)
        gsap.to(".hero__stage", { y: -6, duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: INTRO + 1.5 });
      };
      if (isRevealed()) playIntro();
      else {
        unsub = subscribe(() => {
          if (!isRevealed()) return;
          unsub?.();
          unsub = null;
          ctx.add(playIntro);
        });
      }

      // scrubbed (fully reversible) scroll motion: portrait drifts up + grows slightly, copy fades out
      const scrub = { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.6 };
      gsap.to(".hero__stage", { yPercent: -7, scale: 1.06, ease: "none", transformOrigin: "50% 40%", scrollTrigger: scrub });
      gsap.to(".hero__copy", {
        opacity: 0,
        ease: "none",
        scrollTrigger: { ...scrub, start: "25% top", end: "75% top" },
      });

      // dashed orbit around the orange disc: endless slow turn, and it widens as you scroll away
      gsap.to(".hero__orbit", { rotation: 360, duration: 38, ease: "none", repeat: -1 });
      gsap.to(".hero__orbit i", { scale: 1.6, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".hero__orbit", {
        scale: 1.28,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });
    }, ref);
    return () => {
      unsub?.();
      ctx.revert();
    };
  }, [reduced]);

  // GSAP smooth scroll to the projects section (plain jump when reduced motion is on)
  const goWork = (e) => {
    const target = document.querySelector("#project");
    if (!target) return;
    e.preventDefault();
    if (reduced) target.scrollIntoView();
    else gsap.to(window, { duration: 1.3, ease: "power3.inOut", scrollTo: { y: target, autoKill: true } });
  };

  const par = (style) => (reduced ? undefined : style);
  const fade = (delay, y = 0) => ({
    initial: { opacity: 0, y },
    animate: revealed ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { duration: 1, ease: EASE, delay: INTRO + delay },
  });

  // shown while the 3D chunk loads (does not count as "ready") ...
  const photoFallback = <img className="hero__photo-fallback" src={Dhanendra} alt="Dhanendra Choudhary" />;
  // ... and when WebGL fails for good (the photo alone is then the finished hero)
  const photoFinal = <img className="hero__photo-fallback" src={Dhanendra} alt="Dhanendra Choudhary" onLoad={markHeroReady} onError={markHeroReady} />;

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
        animate={revealed ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
        transition={{ duration: 1.3, ease: EASE, delay: INTRO }}
      >
        <span className="hero__orbit"><i /></span>
      </motion.div>

      {/* photo + 3D ring */}
      <div className="hero__stage">
        <SceneBoundary fallback={photoFinal}>
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
                  <a href={item.href} onClick={goWork} data-active={i === 0 ? "true" : undefined}>{inner}</a>
                )}
              </li>
            );
          })}
        </ul>
        <div className="hero__nav-line" style={{ height: "18vh" }} />
        <a href="#project" onClick={goWork} className="hero__scroll" aria-label="Scroll to projects" />
      </motion.nav>

      <motion.div className="hero__label" {...fade(0.5)}>
        Portfolio<br />/ 2026
      </motion.div>

      {/* copy */}
      <motion.div className="hero__copy" style={par({ y: yCopy })}>
        <motion.div className="hero__name" {...fade(0.2)}>
          Dhanendra Choudhary<i className="hero__rule" />
        </motion.div>

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

      <motion.a href="#project" onClick={goWork} className="hero__cta" {...fade(1)}>
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
