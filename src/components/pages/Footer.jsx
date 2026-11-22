import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import CV from "../../assets/Dhanendra-CV.pdf";
import "./footer.css";

const EASE = [0.16, 1, 0.3, 1];

const EMAIL = "dhanendra.it@gmail.com";

const sitemap = [
  { label: "Work", href: "#project" },
  { label: "Certificates", href: "#certificates" },
  { label: "Skills", href: "#skills" },
  { label: "About", to: "/About" },
  { label: "Services", to: "/Services" },
  { label: "Contact", to: "/Contact" },
];

const elsewhere = [
  { label: "GitHub", href: "https://github.com/dhanendra-it" },
  { label: "LinkedIn", href: "https://linkedin.com/in/dhanendra-it" },
  { label: "WhatsApp", href: "https://wa.me/918827811548" },
  { label: "Download CV", href: CV },
];

const Footer = () => {
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="foot">
      <div className="foot__inner">
        <motion.div
          className="foot__cta"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <p className="foot__eyebrow">(Contact)</p>
          <h2 className="foot__h2">
            Let’s build something <em>useful.</em>
          </h2>
          <a className="foot__mail" href={`mailto:${EMAIL}`}>
            {EMAIL} <ArrowUpRight aria-hidden="true" />
          </a>
          <p className="foot__status">
            <i aria-hidden="true" />
            Open to freelance, internships &amp; full-time roles
          </p>
        </motion.div>

        <div className="foot__cols">
          <nav aria-label="Sitemap">
            <h3>Index</h3>
            <ul>
              {sitemap.map((l) => (
                <li key={l.label}>{l.to ? <Link to={l.to}>{l.label}</Link> : <a href={l.href}>{l.label}</a>}</li>
              ))}
            </ul>
          </nav>

          <div>
            <h3>Elsewhere</h3>
            <ul>
              {elsewhere.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noreferrer">
                    {l.label} <ArrowUpRight aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Based in</h3>
            <p>
              Bhopal,
              <br />
              Madhya Pradesh, India
            </p>
          </div>
        </div>
      </div>

      <div className="foot__word" aria-hidden="true">
        Dhanendra
      </div>

      <div className="foot__bar">
        <span>© 2026 Dhanendra Choudhary. All rights reserved.</span>
        <button type="button" onClick={toTop}>
          Back to top <ArrowUp aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
