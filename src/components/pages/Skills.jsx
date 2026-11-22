import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience, skillGroups, stats } from "./skillsData";
import "./skills.css";

const EASE = [0.16, 1, 0.3, 1];
const pad = (n) => String(n).padStart(2, "0");

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.9, ease: EASE, delay },
});

const Skills = () => {
  const total = skillGroups.reduce((n, g) => n + g.items.length, 0);
  // observe the h2 itself — its lines sit inside overflow:hidden and would never count as "in view"
  const h2Ref = useRef(null);
  const seen = useInView(h2Ref, { once: true, amount: 0.6 });
  const reveal = (delay = 0) => ({
    initial: { y: "110%" },
    animate: { y: seen ? 0 : "110%" },
    transition: { duration: 1.1, ease: EASE, delay },
  });

  return (
    <section id="skills" className="skills" aria-label="Skills and experience">
      <div className="skills__grid">
        <aside className="skills__side">
          <p className="skills__eyebrow">(Skills &amp; Experience)</p>
          <h2 ref={h2Ref} className="skills__h2">
            <span className="line">
              <motion.span {...reveal()}>Skills &amp;</motion.span>
            </span>
            <span className="line">
              <motion.em {...reveal(0.12)}>Experience</motion.em>
            </span>
          </h2>
          <motion.p className="skills__lead" {...rise(0.1)}>
            A full-stack toolkit — interfaces, APIs, databases and desktop apps, with the design
            thinking that makes them feel good to use.
          </motion.p>
          <motion.dl className="skills__stats" {...rise(0.2)}>
            {[...stats, { value: pad(total), label: "Skills & tools" }].map((s) => (
              <div key={s.label}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </aside>

        <div className="skills__main">
          <div className="skills__groups">
            {skillGroups.map((g, gi) => (
              <motion.section key={g.name} className="sgroup" {...rise(0.04 * gi)}>
                <header className="sgroup__head">
                  <span className="sgroup__n">{pad(gi + 1)}</span>
                  <h3>{g.name}</h3>
                </header>
                <ul className="sgroup__items">
                  {g.items.map(({ name, icon: Icon }) => (
                    <li key={name}>
                      <Icon aria-hidden="true" />
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            ))}
          </div>

          <div className="skills__exp">
            <motion.p className="skills__eyebrow" {...rise()}>
              (Experience)
            </motion.p>
            <ol className="exp">
              {experience.map((e, i) => (
                <motion.li key={e.role} className="exp__row" {...rise(0.06 * i)}>
                  <span className="exp__period">{e.period}</span>
                  <div>
                    <h4>{e.role}</h4>
                    <p>{e.text}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
