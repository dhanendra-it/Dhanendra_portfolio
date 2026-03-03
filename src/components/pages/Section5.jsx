import React, { useEffect, useState } from "react";
import Portfolio from "../../assets/portfolio.png";
import Nick from "../../assets/nick.png";
import Unisarthi from "../../assets/unisarthi.png";
import Notes from "../../assets/notes-app.png";

const slides = [
  {
    title: "Portfolio",
    image: Portfolio,
    bg: "#ffffff",
    description:
      "Personal portfolio website showcasing my projects, skills, and experience.",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    title: "Nick Makeover's",
    image: Nick,
    bg: "#ffffff",
    description:
      "Modern salon website with clean UI and responsive design. check it out by clicking",
    technologies: ["React", "Tailwind", "JavaScript"],
  },
  {
    title: "Unisarthi",
    image: Unisarthi,
    bg: "#ffffff",
    description:
      "Student-focused platform built using PHP and frontend technologies.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP"],
  },
  {
    title: "Notes App",
    image: Notes,
    bg: "#ffffff",
    description:
      "Minimal notes application for creating and managing daily tasks.",
    technologies: ["React", "Tailwind", "JavaScript"],
  },
  {
    title: "Login System (Coming Soon)",
    image: null,
    bg: "#fff",
    description: "Secure authentication system built with full MERN stack.",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
  },
];

export default function Section5() {
  const [active, setActive] = useState(0);

  const total = slides.length;
  const rotationAngle = 360 / total;

  // Always auto rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-16 md:pt-20 bg-gray-100 dark:bg-gray-700 transition-colors duration-500" id="project">
      <h1 className="text-center text-5xl font-bold dark:text-white">
        RECENT PROJECTS
      </h1>
      <div className="mt-10 relative w-full h-112.5 md:h-137.5 flex items-center justify-center overflow-hidden perspective-[2000px]">
        <div
          className="relative w-75 md:w-100 h-87.5 md:h-112.5 transition-transform duration-1000"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${-active * rotationAngle}deg)`,
          }}
        >
          {slides.map((slide, index) => {
            const angle = rotationAngle * index;

            return (
              <div
                key={index}
                className="absolute w-60 md:w-100 h-75 md:h-87.5 rounded-2xl overflow-hidden "
                style={{
                  transform: `rotateY(${angle}deg) translateZ(350px)`,
                  boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
                  background: slide.bg,
                }}
              >
                {/* Main Image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className=" object-cover"
                />

                {/* Title */}
                <div className="px-4">
                  <div
                    className="mx-auto w-[90%] max-w-md bg-white dark:bg-gray-400 
                rounded-2xl  shadow-lg  pb-2
                transition-all duration-300"
                  >
                    {/* Heading */}
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center">
                      {slide.title}
                    </h3>

                    <p className="text-xs text-gray-600 dark:text-gray-800 text-center mt-1">
                      {slide.description}
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {slide.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 
      dark:bg-blue-300/40 dark:text-blue-900"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reflection */}
                <div className="absolute top-full left-0 w-full h-full scale-y-[-1] opacity-30 blur-sm">
                  <img
                    src={slide.image}
                    alt="reflection"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-black/40 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
