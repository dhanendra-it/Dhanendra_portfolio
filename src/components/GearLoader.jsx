import { useEffect, useState } from "react";
import "./GearLoader.css";

const GearArtwork = () => (
  <svg className="gear-loader__svg" viewBox="0 0 220 220" role="presentation" aria-hidden="true">
    <defs>
      <linearGradient id="gear-metal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f1e6d2" />
        <stop offset=".22" stopColor="#77716a" />
        <stop offset=".48" stopColor="#d6c8b5" />
        <stop offset=".72" stopColor="#514b46" />
        <stop offset="1" stopColor="#c5a078" />
      </linearGradient>
      <radialGradient id="gear-face" cx=".35" cy=".28" r=".8">
        <stop offset="0" stopColor="#4b4641" />
        <stop offset=".55" stopColor="#24211f" />
        <stop offset="1" stopColor="#090909" />
      </radialGradient>
      <filter id="gear-shadow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="5" />
      </filter>
    </defs>
    <ellipse cx="110" cy="202" rx="66" ry="8" fill="#000" opacity=".55" filter="url(#gear-shadow)" />
    <g className="gear-loader__teeth" fill="url(#gear-metal)" stroke="#292522" strokeWidth="2">
      {Array.from({ length: 12 }, (_, index) => (
        <rect key={index} x="96" y="5" width="28" height="31" rx="4" transform={`rotate(${index * 30} 110 110)`} />
      ))}
    </g>
    <circle cx="110" cy="110" r="91" fill="url(#gear-metal)" stroke="#171514" strokeWidth="4" />
    <circle cx="110" cy="110" r="78" fill="url(#gear-face)" stroke="#8e7760" strokeWidth="2" />
    <circle cx="110" cy="110" r="61" fill="none" stroke="#6d6257" strokeWidth="2" />
    {Array.from({ length: 8 }, (_, index) => {
      const angle = (index * Math.PI) / 4;
      return <circle key={index} cx={110 + Math.cos(angle) * 69} cy={110 + Math.sin(angle) * 69} r="4.5" fill="#d8c5a8" stroke="#28221e" strokeWidth="2" />;
    })}
    <circle cx="110" cy="110" r="43" fill="#12100f" stroke="#b87935" strokeWidth="3" />
    <circle cx="110" cy="110" r="31" fill="none" stroke="#e5a14d" strokeWidth="1.5" opacity=".85" />
    <circle cx="110" cy="110" r="17" fill="#090909" stroke="#75604b" strokeWidth="3" />
    <circle cx="110" cy="110" r="6" fill="#d48b3f" />
    <path d="M62 49 Q83 29 108 31" fill="none" stroke="#fff0d9" strokeWidth="3" opacity=".28" strokeLinecap="round" />
  </svg>
);

export default function GearLoader() {
  const [phase, setPhase] = useState("drop");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const startedAt = Date.now();
    let pageLoaded = document.readyState === "complete";
    let minimumElapsed = false;
    let exitTimer;
    let maximumTimer;

    const tryExit = () => {
      if (!pageLoaded || !minimumElapsed) return;
      setPhase("retract");
      exitTimer = window.setTimeout(() => setVisible(false), 950);
    };

    const onLoad = () => {
      pageLoaded = true;
      tryExit();
    };

    window.addEventListener("load", onLoad, { once: true });
    const minimumTimer = window.setTimeout(() => {
      minimumElapsed = true;
      tryExit();
    }, Math.max(0, 2300 - (Date.now() - startedAt)));

    // Never leave the intro covering the site if a third-party asset stalls.
    maximumTimer = window.setTimeout(() => {
      pageLoaded = true;
      minimumElapsed = true;
      tryExit();
    }, 7000);

    if (pageLoaded) tryExit();

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(minimumTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(maximumTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`gear-loader gear-loader--${phase}`} role="status" aria-label="Loading portfolio">
      <div className="gear-loader__grain" />
      <div className="gear-loader__anchor" aria-hidden="true">
        <span className="gear-loader__rope" />
        <span className="gear-loader__hook" />
      </div>
      <div className="gear-loader__drop">
        <div className="gear-loader__gear">
          <GearArtwork />
        </div>
      </div>
      <span className="gear-loader__caption" aria-hidden="true">A MOMENT, PLEASE</span>
    </div>
  );
}
