import { useState } from "react";
import Ui from "../../assets/OIP.webp";
import Fe from "../../assets/f1.jpg";
import Fs from "../../assets/f2.webp";

const AboutSection = () => {
  const Projects = [
    { path: Ui, name: "UI/UX Design", projects: "25+ Projects" },
    { path: Fe, name: "Frontend Development", projects: "10+ Projects" },
    { path: Fs, name: "MERN Stack", projects: "3 Projects" },
  ];

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * 5;
    const rotateX = ((midY - y) / midY) * 5;

    setTilt({ x: rotateX, y: rotateY });

    setShine({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
    setShine({ x: 50, y: 50 });
  };

  return (
    <div className="flex justify-center items-center mt-20 px-6 md:px-16 perspective-[1200px]">
      
      {/* WRAPPER */}
      <div
        onMouseMove={handleMove}
        onMouseLeave={resetTilt}
        className="relative w-full md:w-[75%] lg:w-[65%] transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`,
        }}
      >

        {/* OUTER GLOW */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-2xl animate-pulse" />

        {/* CARD */}
        <div className="relative bg-white/70 dark:bg-[#0f172a]/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 p-6 md:p-10 rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.3)] overflow-hidden">

          {/* SHINE EFFECT */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.25), transparent 40%)`,
            }}
          />

          {/* INNER SOFT GLOW */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

          {/* CONTENT */}
          <div className="grid md:grid-cols-2 gap-10 relative z-10">

            {/* LEFT */}
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                What I Can Build For You
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                I create scalable, high-performance applications with modern UI,
                strong backend systems, and seamless user experience across web,
                mobile, and desktop platforms.
              </p>

              <div className="grid grid-cols-2 gap-8 mt-10">
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                    10+
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300">
                    Projects Completed
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                    2+
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300">
                    Years Experience
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              {Projects.map((elem, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/40 dark:hover:bg-white/5 transition duration-300"
                >
                  <div className="flex items-center gap-4">
                    
                    {/* IMAGE */}
                    <div className="relative">
                      <img
                        src={elem.path}
                        alt={elem.name}
                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl shadow-lg transition group-hover:scale-110"
                      />

                      {/* IMAGE GLOW */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition" />
                    </div>

                    {/* TEXT */}
                    <div>
                      <h3 className="text-gray-900 text-lg md:text-xl font-semibold dark:text-white group-hover:text-blue-500 transition">
                        {elem.name}
                      </h3>

                      <p className="text-gray-500 dark:text-gray-300 text-sm">
                        {elem.projects}
                      </p>
                    </div>
                  </div>

                  {/* ARROW */}
                  <span className="text-lg md:text-xl transform group-hover:translate-x-2 group-hover:text-blue-500 transition text-gray-400">
                    →
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;