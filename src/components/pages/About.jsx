import React from "react";
import dhruv from "../../assets/dhruv-neww.png";
import CV from "../../assets/Dhanendra-CV.pdf";

const About = () => {
  return (
    <section className="min-h-screen px-6 md:px-20 py-24 bg-gradient-to-br from-[#f8fafc] via-[#e2e8f0] to-[#cbd5f5] dark:from-[#020617] dark:via-[#0f172a] dark:to-[#1e293b] dark:text-white">
      <div className="grid md:grid-cols-2 gap-16 items-center mt-10">
        {/* LEFT - IMAGE */}
        <div className="flex justify-center">
          <div className=" relative group ">
            {/* Glow Effect */}
            <div className=" absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-slate-400 to-indigo-500 blur-lg opacity-30 group-hover:opacity-60 transition duration-500"></div>

            {/* Image Card */}
            <div className=" relative w-80 h-96 rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700 backdrop-blur-xl bg-white/10 dark:bg-white/5 shadow-2xl">
              <img
                src={dhruv}
                alt="About Dhruv"
                className=" w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>

        {/* RIGHT - CONTENT */}
        <div>
          {/* 🔥 PREMIUM HEADING */}
          <h1
            className="text-4xl md:text-5xl font-bold mb-6 
            bg-gradient-to-r from-[#1e293b] via-[#64748b] to-[#cbd5f5] 
            dark:from-[#e2e8f0] dark:via-[#94a3b8] dark:to-white
            bg-clip-text text-transparent animate-gradient"
          >
            About Me
          </h1>

          {/* Text */}
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            I’m Dhanendra Choudhary, a passionate Full Stack Developer and
            Software Engineer currently pursuing BTech in Information
            Technology. Over time, I have evolved from building web applications
            to developing complete digital solutions including ERP systems,
            mobile applications, and scalable backend architectures.
          </p>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            I specialize in creating high-performance applications using modern
            technologies like React, Node.js, Express, and MongoDB, along with
            cross-platform mobile apps. I focus on building seamless user
            experiences combined with strong, scalable system design. Beyond
            development, I’m deeply interested in advanced UI/UX, 3D experiences
            with Three.js, and continuously pushing my limits to build
            real-world products that solve meaningful problems.
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-8 flex-wrap">
            {/* Download CV */}
            <a
              href={CV}
              download
              className="px-6 py-3 rounded-xl font-semibold 
              bg-gradient-to-r from-indigo-500 to-blue-500 text-white 
              shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
            >
              Download CV
            </a>

            {/* Contact */}
            <a
              href="https://wa.me/918827811548"
              className="px-6 py-3 rounded-xl font-semibold 
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
