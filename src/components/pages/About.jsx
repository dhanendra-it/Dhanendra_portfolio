import React from "react";
import dhruv from "../../assets/dhruv-neww.webp";
import CV from "../../assets/Dhanendra-CV.pdf";

const About = () => {
  return (
    <section className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-20 pt-24 sm:pt-28 pb-16 bg-gradient-to-br from-[#f8fafc] via-[#e2e8f0] to-[#cbd5f5] dark:from-[#020617] dark:via-[#0f172a] dark:to-[#1e293b] dark:text-white transition-colors duration-500">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center mt-4 sm:mt-8">
        {/* LEFT - IMAGE */}
        <div className="flex justify-center">
          <div className="relative group w-full max-w-[18rem] sm:max-w-[20rem]">
            {/* Glow Effect */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-slate-400 to-indigo-500 blur-lg opacity-30 group-hover:opacity-60 transition duration-500"></div>

            {/* Image Card */}
            <div className="relative w-full aspect-[4/5] sm:h-96 rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700 backdrop-blur-xl bg-white/10 dark:bg-white/5 shadow-2xl">
              <img
                src={dhruv}
                alt="About Dhanendra"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>

        {/* RIGHT - CONTENT */}
        <div>
          {/* 🔥 PREMIUM HEADING */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 
            bg-gradient-to-r from-[#1e293b] via-[#64748b] to-[#cbd5f5] 
            dark:from-[#e2e8f0] dark:via-[#94a3b8] dark:to-white
            bg-clip-text text-transparent animate-gradient"
          >
            About Me
          </h1>

          {/* Text */}
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            I’m Dhanendra Choudhary, a passionate Full Stack Developer and
            Software Engineer currently pursuing BTech in Information
            Technology. Over time, I have evolved from building web applications
            to developing complete digital solutions including ERP systems,
            mobile applications, and scalable backend architectures.
          </p>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-sm sm:text-base">
            I specialize in creating high-performance applications using modern
            technologies like React, Node.js, Express, and MongoDB, along with
            cross-platform mobile apps. I focus on building seamless user
            experiences combined with strong, scalable system design. Beyond
            development, I’m deeply interested in advanced UI/UX, 3D experiences
            with Three.js, and continuously pushing my limits to build
            real-world products that solve meaningful problems.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
            {/* Download CV */}
            <a
              href={CV}
              download
              className="px-6 py-3 rounded-xl font-semibold text-center
              bg-gradient-to-r from-indigo-500 to-blue-500 text-white 
              shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
            >
              Download CV
            </a>

            {/* Contact */}
            <a
              href="https://wa.me/918827811548"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl font-semibold text-center
              border border-gray-400 dark:border-gray-600 
              hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* 🔥 Gradient Animation */}
      <style>
        {`
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientMove 6s ease infinite;
          }

          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </section>
  );
};

export default About;
