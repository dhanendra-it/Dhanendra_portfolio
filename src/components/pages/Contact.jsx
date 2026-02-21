import React from "react";
import { CiMail } from "react-icons/ci";
import { FiMapPin } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";


const Contact = () => {
  return (
    <section className="min-h-screen py-20 bg-gray-100 dark:bg-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
          Contact Me
        </h2>

        <div className="grid md:grid-cols-2 gap-16">

          {/* LEFT SIDE - INFO */}
          <div className="space-y-8">

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
                Let's Work Together
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I'm open to freelance projects, internships, and full-time
                opportunities. If you have a project idea or want to collaborate,
                feel free to reach out.
              </p>
            </div>

            <div className="space-y-4">

              <div className="flex items-center gap-4">
                <CiMail className="text-gray-700 dark:text-white" />
                <a
                  href="mailto:dhanendra.it@gmail.com"
                  className="text-gray-700 dark:text-gray-300 hover:underline"
                >
                  Dhanendra.it@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-4">
              <FiMapPin className="text-gray-700 dark:text-white" />
                <span className="text-gray-700 dark:text-gray-300">
                  Bhopal, Madhya Pradesh, India
                </span>
              </div>

              <div className="flex gap-6 pt-4">

                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 dark:text-white hover:scale-110 transition"
                >
                 <FaGithub size={24} />
                </a>

                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 dark:text-white hover:scale-110 transition"
                >
                  <FaLinkedinIn size={24} />
                </a>

              </div>

            </div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-700">

            <form className="space-y-6">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 
                text-gray-800 dark:text-white outline-none"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 
                text-gray-800 dark:text-white outline-none"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 
                text-gray-800 dark:text-white outline-none"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 
                text-gray-800 dark:text-white outline-none resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-black dark:bg-white 
                text-white dark:text-black 
                py-3 rounded-lg font-semibold 
                hover:scale-105 transition"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;