import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { certificates } from "./certificatesData";
import "./certificates.css";

const EASE = [0.16, 1, 0.3, 1];
const pad = (n) => String(n).padStart(2, "0");

const Certificates = () => {
  const total = certificates.length;
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const c = certificates[active];
  // observe the h2 itself — its lines sit inside overflow:hidden and would never count as "in view"
  const h2Ref = useRef(null);
  const seen = useInView(h2Ref, { once: true, amount: 0.6 });
  const reveal = (delay = 0) => ({
    initial: { y: "110%" },
    animate: { y: seen ? 0 : "110%" },
    transition: { duration: 1.1, ease: EASE, delay },
  });

  const prev = () => setActive((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setActive((i) => (i === total - 1 ? 0 : i + 1));

  // warm the cache so switching certificates never flashes
  useEffect(() => {
    certificates.forEach(({ image }) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  return (
    <section id="certificates" className="certs" aria-label="Certificates">
      <div className="certs__grid">
        <div className="certs__left">
          <p className="certs__eyebrow">(Credentials / {pad(total)})</p>
          <h2 ref={h2Ref} className="certs__h2">
            <span className="line">
              <motion.span {...reveal()}>Learning,</motion.span>
            </span>
            <span className="line">
              <motion.em {...reveal(0.12)}>certified.</motion.em>
            </span>
          </h2>

          <ul className="certs__list">
            {certificates.map((item, i) => (
              <li key={item.title + item.issuer}>
                <button
                  type="button"
                  className="certs__row"
                  data-active={i === active || undefined}
                  aria-pressed={i === active}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="certs__n">{pad(i + 1)}</span>
                  <span className="certs__t">
                    <b>{item.title}</b>
                    <i>{item.issuer}</i>
                  </span>
                  <span className="certs__d">{item.date}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="certs__right">
          <div className="certs__frame">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={c.image}
                alt={`${c.title} certificate from ${c.issuer}`}
                draggable={false}
                initial={reduced ? false : { opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: EASE }}
              />
            </AnimatePresence>

            {/* mobile navigation arrows overlaid on frame */}
            <div className="certs__frame-arrows">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous certificate"
                className="certs__arrow-btn"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next certificate"
                className="certs__arrow-btn"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="certs__meta">
            <div className="certs__meta-issuer">
              <span>
                {pad(active + 1)} / {pad(total)} · {c.issuer}
              </span>
            </div>
            <span className="certs__links">
              <a href={c.image} target="_blank" rel="noreferrer">
                View full <ArrowUpRight aria-hidden="true" />
              </a>
              {c.verify && (
                <a href={c.verify} target="_blank" rel="noreferrer">
                  Verify <ArrowUpRight aria-hidden="true" />
                </a>
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
