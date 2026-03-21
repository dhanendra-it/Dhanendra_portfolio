import React, { useState, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TRP from "../../assets/psir.png";
import FP from "../../assets/faceless.jpg";

const testimonials = [
  {
    name: "",
    role: "owner of Unisarthi",
    image: FP,
    review:
      "I worked with Dhanendra to make my website. I am speechless by looking at his work ethic and dedication. Working with him was the best decision I made.",
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

  // 🔥 Swipe refs
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // 🔥 Swipe logic
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      next(); // swipe left
    }

    if (touchEndX.current - touchStartX.current > 50) {
      prev(); // swipe right
    }
  };

  const t = testimonials[index];

  return (
    <section className="py-10 bg-[#f8fafc] dark:bg-[#020617] overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">

        {/* HEADING */}
        <h2 className="text-2xl md:text-4xl font-semibold mb-10 md:mb-16 px-4 py-2 rounded-xl text-slate-800">
          What my clients are saying?
        </h2>

        {/* CARD */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative bg-white dark:bg-[#0f172a] rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-8"
        >

          {/* IMAGE */}
          <img
            src={t.image}
            alt={t.name}
            className="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover shadow-md"
          />

          {/* CONTENT */}
          <div className="text-center md:text-left">
            <p className="text-gray-600 dark:text-gray-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
              “{t.review}”
            </p>

            <h3 className="text-lg md:text-xl font-semibold text-slate-700">
              {t.name}
            </h3>

            <p className="text-xs md:text-sm text-gray-500">{t.role}</p>
          </div>

          {/* LEFT BUTTON */}
          <button
            onClick={prev}
            className="absolute left-2 md:left-[-50px] top-1/2 -translate-y-1/2 text-slate-700 text-xl md:text-2xl"
          >
            <FaArrowLeft />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={next}
            className="absolute right-2 md:right-[-50px] top-1/2 -translate-y-1/2 text-slate-700 text-xl md:text-2xl"
          >
            <FaArrowRight />
          </button>

        </div>

        {/* DOTS */}
        <div className="flex justify-center mt-6 md:mt-8 gap-2">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? "bg-slate-800 w-6"
                  : "bg-gray-300 w-2"
              }`}
            ></div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;