import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TRP from "../../assets/psir.png";
import FP from "../../assets/faceless.jpg";

const testimonials = [
  {
    name: "",
    role: "owner of Unisarthi",
    image: FP,
    review:
      "I worked with Anurag to make my website. I am speechless by looking at his work ethic and dedication. Working with him was the best decision I made.",
  },
  {
    name: "Prashant Thakre",
    role: "Owner of T.R.P institute of Balaghat.",
    image: TRP,
    review:
      "Amazing experience! The project was delivered on time with excellent quality. Highly recommended for any development work.",
  },
  {
    name: "nikita kardate",
    role: "Owner of nick makeover's",
    image: FP,
    review:
      "Professional, fast and very supportive. The UI/UX they delivered was beyond my expectations.",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const t = testimonials[index];

  return (
    <section className="py-10 bg-[#f8fafc] dark:bg-[#020617]">

      <div className="max-w-5xl mx-auto px-6 text-center">

        {/* 🔥 HEADING */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-16 inline-block px-6 py-3 rounded-xl text-slate-800">
          What my clients are saying?
        </h2>

        {/* 🔥 CARD */}
        <div className="relative bg-white dark:bg-[#0f172a] rounded-2xl shadow-lg p-10 flex flex-col md:flex-row items-center gap-8">

          {/* IMAGE */}
          <img
            src={t.image}
            alt={t.name}
            className="w-40 h-40 rounded-full object-cover shadow-md"
          />

          {/* CONTENT */}
          <div className="text-left">

            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              “{t.review}”
            </p>

            <h3 className="text-xl font-semibold text-slate-700">
              {t.name}
            </h3>

            <p className="text-sm text-gray-500">{t.role}</p>
          </div>

          {/* LEFT BUTTON */}
          <button
            onClick={prev}
            className="absolute left-[-50px] top-1/2 -translate-y-1/2 text-slate-700 text-2xl"
          >
            <FaArrowLeft />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={next}
            className="absolute right-[-50px] top-1/2 -translate-y-1/2 text-slate-700 text-2xl"
          >
            <FaArrowRight />
          </button>

        </div>

        {/* 🔥 DOTS */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === index ? "bg-slate-800 w-6" : "bg-gray-300"
              } transition-all`}
            ></div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;