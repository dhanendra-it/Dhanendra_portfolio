import { useRef } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

import Dhruv from "../../assets/dhruv-neww.png";
import { BsStars } from "react-icons/bs";
import { PiStarFourFill } from "react-icons/pi";
import HeroButton from "./HeroButton";

const Section1 = () => {
  const cardRef = useRef(null);

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateX = (py - 0.5) * 3;
    const rotateY = (px - 0.5) * -3;

    if (cardRef.current) {
      cardRef.current.style.transform = `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    }
  };

  const resetTilt = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1200px) rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div className="relative flex justify-center items-center px-4 overflow-hidden pb-10">
      {/* 🔥 PARTICLES (FULLY STABLE) */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        <Particles
          init={particlesInit}
          className="w-full h-full"
          options={{
            fullScreen: false,

            particles: {
              number: { value: 35 },

              color: {
                value: ["#3b82f6", "#8b5cf6", "#64748b", "#22c55e", "#f1f1f1"],
              },

              shape: {
                type: ["circle", "polygon"],
              },

              size: {
                value: { min: 3, max: 15 },
              },

              opacity: {
                value: { min: 0.2, max: 1 },
              },

              move: {
                enable: true,
                speed: 2,
                random: true,
                outModes: {
                  default: "out",
                },
              },
            },

            interactivity: {
              events: {}, // ❌ no hover interaction
            },

            detectRetina: true,
          }}
        />
      </div>

      {/* 🌈 BACKGROUND GLOW */}
      <div className="absolute w-[400px] h-[400px] bg-blue-400/20 blur-[120px] top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-400/20 blur-[120px] bottom-[-100px] right-[-100px]" />

      {/* 💎 MAIN CARD */}
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={resetTilt}
        style={{
          transform: "perspective(1200px) rotateX(0deg) rotateY(0deg)",
          transformStyle: "preserve-3d",
        }}
        className="w-full lg:w-5/6 flex flex-col lg:flex-row items-center justify-evenly  py- lg:py-20 bg-[#c3cfe2aa] dark:bg-[#0d042595] mt-8 rounded-3xl gap-10 relative z-10 overflow-hidden transition-transform duration-200 ease-out will-change-transform"
      >
        {/* 🧑 CONTENT */}
        <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-evenly gap-10">
          {/* 🎯 IMAGE */}
          <div className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-100 lg:h-95">
            <span className="absolute top-15 left-6 text-blue-400 text-lg animate-pulse">
              <BsStars />
            </span>

            <span className="absolute top-15 right-6 text-purple-400 text-sm animate-bounce">
              <PiStarFourFill />
            </span>

            <span className="absolute top-3/4 left-2 text-purple-400 text-sm z-10 animate-pulse">
              <PiStarFourFill />
            </span>

            <span className="absolute bottom-6 right-2 text-blue-300 text-2xl animate-bounce">
              <BsStars />
            </span>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-60 h-60 bg-blue-400/30 blur-3xl rounded-full animate-pulse" />

            <div className="absolute bottom-0 w-full h-3/4 bg-[#cfd9df] dark:bg-dark-four rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all duration-300 ease-in-out hover:scale-105"></div>

            <img
              src={Dhruv}
              alt="Dhanendra"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 sm:w-64 lg:w-80 
                         transition-all duration-500 ease-in-out 
                         hover:scale-110 hover:-translate-y-2"
            />
          </div>

          {/* ✍️ TEXT */}
          <div className="flex flex-col gap-10 text-center lg:text-left">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-800 dark:text-white">
                I'm
              </h1>

              <h1
                className="animated-gradient text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Dhanendra
              </h1>

              <h6 className="text-sm sm:text-base lg:text-lg text-gray-500">
                Dhanendra Choudhary - Software Developer
              </h6>

              <hr className="w-1/2 mx-auto lg:mx-0 h-0.5 bg-slate-800 dark:bg-white border-none rounded-3xl mt-5" />
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start justify-between">
              <p className="text-sm sm:text-base tracking-wide text-gray-700 dark:text-slate-400 max-w-md">
                Building seamless experiences across web, desktop, and mobile
                using modern full-stack technologies and scalable system design.
              </p>

              <div className="flex flex-col gap-2 pb-3 lg:pb-1">
                <HeroButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🎨 GRADIENT TEXT */}
      <style jsx>{`
        .animated-gradient {
          background: linear-gradient(
            135deg,
            #1e293b,
            #334155,
            #64748b,
            #cbd5f5,
            #1e293b
          );
          background-size: 350% 350%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: premiumGradient 10s ease-in-out infinite;
        }

        @keyframes premiumGradient {
          0% {
            background-position: 0% 50%;
          }
          20% {
            background-position: 100% 30%;
          }
          40% {
            background-position: 70% 100%;
          }
          60% {
            background-position: 30% 70%;
          }
          80% {
            background-position: 80% 10%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default Section1;
