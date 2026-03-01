import React from "react";
import dhruv from '../../assets/dhruv-neww.png'
import CV from '../../assets/Dhanendra-CV.pdf'

const About = () => {
  return (
    <section className="min-h-screen dark:bg-black dark:text-white px-6 md:px-20 py-20 ">
      <div className="grid md:grid-cols-2 gap-16 items-center mt-20">

        {/* LEFT SIDE - IMAGE */}
        <div className="flex justify-center">
          <div className="relative w-80 h-96 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
            <img
              src={dhruv}
              alt="About Dhruv"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT SIDE - CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6  dark:">
            About Me
          </h1>

          <p className="text-gray-400 leading-relaxed mb-6 ">
            I’m Dhanendra Choudhary, a passionate Full Stack Developer currently
            pursuing BTech in Information Technology. I specialize in building
            modern web applications using React, Node.js, Express, and MongoDB.
            I love creating smooth UI experiences and interactive designs.
          </p>

          <p className="text-gray-400 leading-relaxed mb-6">
            Beyond web development, I’m deeply interested in 3D modeling and
            animation using Blender and exploring advanced frontend experiences
            with Three.js. My goal is to become an industry-level developer
            who builds both visually stunning and technically powerful
            applications.
          </p>

          <div className="flex gap-4 mt-8 flex-wrap">

            {/* Download CV */}
            <a
              href={CV}
              download
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-semibold hover:bg-gray-300 transition"
            >
              Download CV
            </a>

            {/* Contact Button */}
            <a
              href="/contact"
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-semibold hover:bg-gray-300 transition"
            >
              Contact Me
            </a>

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;