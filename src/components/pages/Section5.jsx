import React, { useEffect, useState } from "react";
import Portfolio from "../../assets/portfolio.png";
import Nick from "../../assets/nick.png";
import Unisarthi from "../../assets/unisarthi.png";
import Notes from "../../assets/notes-app.png";
import ERP from "../../assets/bajajErp.webp";

const slides = [
  {
    title: "Coaching ERP",
    image: ERP,
    description:
      "Complete coaching management system to manage students, fees, batches, attendance, and reports with a powerful dashboard.",
    technologies: ["React", "Node.js", "Express", "MySQL", "Tailwind"],
  },
  {
    title: "Portfolio",
    image: Portfolio,
    description:
      "Personal portfolio website showcasing my projects, skills, and experience.",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    title: "Nick Makeover's",
    image: Nick,
    description: "Modern salon website with clean UI and responsive design.",
    technologies: ["React", "Tailwind", "JavaScript"],
  },
  {
    title: "Unisarthi",
    image: Unisarthi,
    description:
      "Student-focused platform built using PHP and frontend technologies.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP"],
  },
];

export default function Section5() {
  const [active, setActive] = useState(0);
  const total = slides.length;

  // ✅ continuous increment (no reset jump)
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => prev + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // ✅ smooth circular logic
  const getPosition = (index) => {
    const current = active % total;

    let diff = index - current;

    // ✅ circular fix
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === -1) return "left";

    return "hidden";
  };

  return (
    <section
      className="pt-20 bg-gray-100 dark:bg-gray-800 overflow-x-hidden "
      id="project"
    >
      {/* HEADING */}
      <h1 className="text-center text-3xl sm:text-4xl md:text-6xl font-bold dark:text-white">
        RECENT PROJECTS
      </h1>

      {/* SLIDER */}
      <div className="relative mt-10 md:mt-16 h-[450px] sm:h-[480px] md:h-[600px] flex items-center justify-center overflow-hidden pb-5">
        {slides.map((slide, index) => {
          const position = getPosition(index);

          return (
            <div
              key={index}
              className="
  absolute 
  w-[94%] sm:w-[88%] md:w-[75%] lg:w-[65%]
  h-[460px] sm:h-[500px] md:h-[500px]
  rounded-2xl md:rounded-3xl
  bg-white dark:bg-gray-900 
  shadow-xl md:shadow-2xl 
  overflow-hidden 
  transition-all duration-700
"
              style={{
                transform:
                  position === "center"
                    ? "translateX(0) scale(1)"
                    : position === "left"
                      ? "translateX(-40%) scale(0.9) rotateY(15deg)"
                      : position === "right"
                        ? "translateX(40%) scale(0.9) rotateY(-15deg)"
                        : "scale(0)",
                opacity:
                  position === "center" ? 1 : position === "hidden" ? 0 : 0.5,
                zIndex: position === "center" ? 10 : 5,
              }}
            >
              <div className="w-full h-full flex flex-col md:flex-row">
                {/* IMAGE */}
                <div className="w-full md:w-[60%] lg:w-[65%] h-[45%] md:h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-3 md:p-6">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="max-h-full max-w-full object-contain rounded-lg md:rounded-xl"
                  />
                </div>

                {/* CONTENT */}
                <div className="w-full md:w-[40%] lg:w-[35%] p-4 sm:p-5 md:p-8 flex flex-col justify-center">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    {slide.title}
                  </h2>

                  <span className="text-xs text-blue-500 mt-1">
                    Full Stack Project
                  </span>

                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {slide.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {slide.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-[11px] rounded-md bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-5">
                    <button className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition">
                      Live Demo
                    </button>
                  </div>

                  <ul className="mt-4 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <li>• Responsive Design</li>
                    <li>• Clean UI/UX</li>
                    <li>• Optimized Performance</li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
