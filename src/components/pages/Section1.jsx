import { useRef } from "react";
import Dhruv from "../../assets/dhruv-neww.png";
import "./Section1.css";

const Section1 = () => {
  const heroRef = useRef(null);

  const handlePointerMove = (event) => {
    if (!heroRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = heroRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroRef.current.style.setProperty("--pointer-x", `${x * 10}px`);
    heroRef.current.style.setProperty("--pointer-y", `${y * 8}px`);
  };

  const resetPointer = () => {
    if (!heroRef.current) return;
    heroRef.current.style.setProperty("--pointer-x", "0px");
    heroRef.current.style.setProperty("--pointer-y", "0px");
  };

  return (
    <section
      ref={heroRef}
      className="portfolio-hero"
      aria-label="Dhanendra Choudhary portfolio introduction"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="portfolio-hero__paper-grain" aria-hidden="true" />
      <div className="portfolio-hero__giant-letter" aria-hidden="true">D</div>
      <div className="portfolio-hero__orange-disc" aria-hidden="true" />

      <div className="portfolio-hero__identity">
        <span className="portfolio-hero__eyebrow">DHANENDRA CHOUDHARY</span>
        <span className="portfolio-hero__identity-line" />
        <span className="portfolio-hero__edition">PORTFOLIO<br />/ 2026</span>
      </div>

      <div className="portfolio-hero__portrait-stage">
        <div className="portfolio-hero__chrome portfolio-hero__chrome--back" aria-hidden="true" />
        <img
          src={Dhruv}
          alt="Portrait of Dhanendra Choudhary"
          className="portfolio-hero__portrait"
          fetchPriority="high"
          decoding="async"
        />
        <div className="portfolio-hero__chrome portfolio-hero__chrome--front" aria-hidden="true" />
      </div>

      <div className="portfolio-hero__copy">
        <p className="portfolio-hero__kicker">INDEPENDENT DEVELOPER <span>—</span> PRODUCT THINKER</p>
        <h1>
          Builder of
          <br />
          Useful
          <br />
          <em>Products</em>
        </h1>
        <p className="portfolio-hero__description">
          Full-Stack Developer &amp; Product Maker — building seamless web,
          desktop and mobile software that turns real problems into thoughtful products.
        </p>
      </div>

      <a className="portfolio-hero__explore" href="#work" aria-label="Explore my work">
        <span className="portfolio-hero__explore-arrow" aria-hidden="true">↘</span>
        <span>EXPLORE<br />MY WORK</span>
      </a>

      <div className="portfolio-hero__index" aria-hidden="true">
        <span>01</span><span>—</span><span>CREATIVE TECHNOLOGY</span>
      </div>
    </section>
  );
};

export default Section1;
