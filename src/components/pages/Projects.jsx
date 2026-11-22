import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "./projectsData";
import "./projects.css";

const EASE = [0.16, 1, 0.3, 1];
const PACE = 0.9; // scroll length = horizontal distance × PACE (kam = track tez chalta hai)
const pad = (n) => String(n).padStart(2, "0");
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

function useDesktop() {
  const query = "(min-width: 1024px)";
  const [yes, setYes] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setYes(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return yes;
}

/* ───────── pieces ───────── */

const Intro = ({ total }) => {
  // observe the (unclipped) wrapper — the lines themselves sit inside overflow:hidden
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.3 });
  const reveal = (delay = 0) => ({
    initial: { y: "110%" },
    animate: { y: seen ? 0 : "110%" },
    transition: { duration: 1.1, ease: EASE, delay },
  });
  return (
    <div ref={ref} className="work__intro">
      <p className="work__eyebrow">(Portfolio / 2026)</p>
      <h2 className="work__h2">
        <span className="line">
          <motion.span {...reveal()}>Selected</motion.span>
        </span>
        <span className="line">
          <motion.em {...reveal(0.12)}>Work</motion.em>
        </span>
      </h2>
      <p className="work__lead">
        Products I’ve designed, built and shipped — from ERP systems to client websites.
        <b> {pad(total)} so far.</b>
      </p>
    </div>
  );
};

const Outro = () => (
  <div className="work__outro">
    <p className="work__eyebrow">More on the way</p>
    <h3 className="work__h3">
      Have something
      <br />
      to <em>build?</em>
    </h3>
    <div className="work__ctas">
      <Link to="/Contact">
        Let’s talk <ArrowUpRight aria-hidden="true" />
      </Link>
      <a href="https://github.com/dhanendra-it" target="_blank" rel="noreferrer">
        All code on GitHub <ArrowUpRight aria-hidden="true" />
      </a>
    </div>
  </div>
);

const CardBody = ({ p, i, total, imgStyle }) => (
  <>
    <div className="pcard__media">
      <span className="pcard__idx" aria-hidden="true">{pad(i + 1)}</span>
      <motion.img
        src={p.image}
        alt={`${p.title} preview`}
        loading="lazy"
        draggable={false}
        style={{ scale: 1.14, ...imgStyle }}
      />
    </div>
    <div className="pcard__body">
      <div className="pcard__top">
        <span>{pad(i + 1)} / {pad(total)}</span>
        <span>{[p.category, p.year].filter(Boolean).join("  ·  ")}</span>
      </div>
      <div>
        <h3 className="pcard__title">{p.title}</h3>
        <p className="pcard__desc">{p.description}</p>
        <ul className="pcard__tags">
          {p.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <div className="pcard__links">
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer">
            Live site <ArrowUpRight aria-hidden="true" />
          </a>
        )}
        {p.github && (
          <a href={p.github} target="_blank" rel="noreferrer">
            Source <ArrowUpRight aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  </>
);

/* card on the pinned track: image drifts inside its frame, far cards recede */
const PinnedCard = ({ p, i, total, trackX }) => {
  const ref = useRef(null);
  const center = useRef(0);

  useLayoutEffect(() => {
    const el = ref.current;
    const measure = () => {
      center.current = el.offsetLeft + el.offsetWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el.parentElement);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // −1…1: where the card centre is relative to the viewport centre
  const off = (v) => (center.current + v - window.innerWidth / 2) / window.innerWidth;
  const imgX = useTransform(trackX, (v) => `${clamp(off(v), -1, 1) * -5}vw`);
  const scale = useTransform(trackX, (v) => 1 - clamp(Math.abs(off(v)), 0, 1) * 0.06);
  const opacity = useTransform(trackX, (v) => 1 - clamp(Math.abs(off(v)) - 0.45, 0, 1) * 0.55);

  return (
    <motion.article ref={ref} className="pcard" style={{ scale, opacity }}>
      <CardBody p={p} i={i} total={total} imgStyle={{ x: imgX }} />
    </motion.article>
  );
};

/* ───────── desktop: pinned horizontal scroll ───────── */

const Pinned = () => {
  const total = projects.length;
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const dist = useRef(0);
  const [height, setHeight] = useState("100vh");
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const measure = () => {
      dist.current = Math.max(0, track.scrollWidth - window.innerWidth);
      setHeight(`calc(100vh + ${Math.round(dist.current * PACE)}px)`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, (v) => -v * dist.current);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const n = clamp(Math.round(v * (total - 1)), 0, total - 1);
    setActive((prev) => (prev === n ? prev : n));
    setStarted(v > 0.015);
  });

  return (
    <section ref={sectionRef} id="project" className="work" style={{ height }} aria-label="Projects">
      <div className="work__pin">
        <motion.div ref={trackRef} className="work__track" style={{ x }}>
          <Intro total={total} />
          {projects.map((p, i) => (
            <PinnedCard key={p.title} p={p} i={i} total={total} trackX={x} />
          ))}
          <Outro />
        </motion.div>

        <div className="work__hud" aria-hidden="true">
          <span className="work__count">
            {pad(active + 1)}
            <i> / {pad(total)}</i>
          </span>
          <span className="work__bar">
            <motion.span style={{ scaleX: scrollYProgress }} />
          </span>
          <span className="work__hint" data-hidden={started || undefined}>
            Scroll <ArrowRight />
          </span>
        </div>
      </div>
    </section>
  );
};

/* ───────── mobile / tablet / reduced-motion: plain vertical stack ───────── */

const Stack = () => {
  const total = projects.length;
  return (
    <section id="project" className="work work--stack" aria-label="Projects">
      <Intro total={total} />
      <div className="work__list">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            className="pcard"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <CardBody p={p} i={i} total={total} />
          </motion.article>
        ))}
      </div>
      <Outro />
    </section>
  );
};

const Projects = () => {
  const desktop = useDesktop();
  const reduced = useReducedMotion();
  return desktop && !reduced ? <Pinned /> : <Stack />;
};

export default Projects;
