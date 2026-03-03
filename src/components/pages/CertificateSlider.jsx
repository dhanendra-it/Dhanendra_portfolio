import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react";
import C1 from "../../assets/sololearn.jpg";
import C2 from "../../assets/skillup.jpg";
import C3 from "../../assets/forage.jpg";
import C4 from "../../assets/IBM.jpg";
import C5 from "../../assets/Prashant.png";

export default function CertificateSlider() {
  const [current, setCurrent] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Only image inside object
  const certificates = [
    { image: C1 },
    { image: C2 },
    { image: C3 },
    { image: C4 },
    { image: C5 },
  ];

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % certificates.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? certificates.length - 1 : prev - 1
    );
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500 p-6">
        
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 shadow-md"
        >
          {darkMode ? (
            <Sun className="text-yellow-400" />
          ) : (
            <Moon className="text-gray-700" />
          )}
        </button>

        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-white">
          My Certificates
        </h2>

        <div className="relative w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
  key={current}
  initial={{ opacity: 0, x: 100 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -100 }}
  transition={{ duration: 0.5 }}
  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 flex items-center justify-center"
>
  <img
    src={certificates[current].image}
    alt="certificate"
    className="max-h-125 w-full object-contain"
  />
</motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-5 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-5 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex space-x-3 mt-6">
          {certificates.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
                current === index
                  ? "bg-blue-500 scale-125"
                  : "bg-gray-400 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
