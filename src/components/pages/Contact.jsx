import React from "react";
import { CiMail } from "react-icons/ci";
import { FiMapPin } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";


const Contact = () => {
  return (
    <section className="min-h-screen pt-24 sm:pt-28 pb-16 bg-gray-100 dark:bg-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-16 text-gray-800 dark:text-white">
          Contact Me
        </h2>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* LEFT SIDE - INFO */}
          <div className="space-y-6 sm:space-y-8">

            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-white">
                Let's Work Together
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                I'm open to freelance projects, internships, and full-time
                opportunities. If you have a project idea or want to collaborate,
                feel free to reach out.
              </p>
            </div>

            <div className="space-y-4">

              <div className="flex items-center gap-4">
                <CiMail className="text-xl text-gray-700 dark:text-white flex-shrink-0" />
                <a
                  href="mailto:dhanendra.it@gmail.com"
                  className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:underline break-all"
                >
                  dhanendra.it@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-4">
                <FiMapPin className="text-xl text-gray-700 dark:text-white flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  Bhopal, Madhya Pradesh, India
                </span>
              </div>

              <div className="flex gap-6 pt-3">

                <a
                  href="https://github.com/dhanendra-it"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="text-gray-700 dark:text-white hover:scale-110 transition p-1"
                >
                  <FaGithub size={24} />
                </a>

                <a
                  href="https://linkedin.com/in/dhanendra-it"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="text-gray-700 dark:text-white hover:scale-110 transition p-1"
                >
                  <FaLinkedinIn size={24} />
                </a>

              </div>

            </div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="bg-white dark:bg-zinc-900 p-5 sm:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-700">

            <form
              className="space-y-4 sm:space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! Your message has been noted.");
              }}
            >

              <div>
                <label htmlFor="contact-name" className="sr-only">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full p-3 text-base rounded-lg bg-gray-100 dark:bg-zinc-800 
                  text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="sr-only">Your Email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="Your Email"
                  className="w-full p-3 text-base rounded-lg bg-gray-100 dark:bg-zinc-800 
                  text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="contact-subject" className="sr-only">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Subject"
                  className="w-full p-3 text-base rounded-lg bg-gray-100 dark:bg-zinc-800 
                  text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="sr-only">Your Message</label>
                <textarea
                  id="contact-message"
                  rows="4"
                  required
                  placeholder="Your Message"
                  className="w-full p-3 text-base rounded-lg bg-gray-100 dark:bg-zinc-800 
                  text-gray-800 dark:text-white outline-none resize-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black dark:bg-white 
                text-white dark:text-black 
                py-3.5 rounded-lg font-semibold text-base
                hover:opacity-90 active:scale-[0.99] transition cursor-pointer"
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