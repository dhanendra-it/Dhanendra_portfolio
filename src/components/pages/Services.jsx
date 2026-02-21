import React, { useEffect, useRef } from "react";

const services = [
  {
    title: "UI / UX Design",
    desc: "Modern, user-focused interfaces designed with clean aesthetics and smooth user journeys. Optimized for usability and engagement.",
  },
  {
    title: "Frontend Development",
    desc: "Responsive and interactive websites built with React, Tailwind CSS, and modern JavaScript for high performance and scalability.",
  },
  {
    title: "Full Stack Development",
    desc: "Complete web applications using React, Node.js, Express, and MongoDB with secure authentication and API integrations.",
  },
  {
    title: "Admin Panel Systems",
    desc: "Powerful admin dashboards with analytics, role management, secure login systems, and complete data control.",
  },
  {
    title: "Portfolio Websites",
    desc: "High-end personal portfolio websites with animations, modern UI, and interactive sections to stand out professionally.",
  },
  {
    title: "E-Commerce Websites",
    desc: "Scalable online stores with cart system, payment integration, product management, and optimized performance.",
  },
  {
    title: "Business Websites",
    desc: "Professional business websites that build brand trust, generate leads, and showcase services effectively.",
  },
];

const Services = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let scrollAmount = 0;

    const slide = () => {
      if (slider) {     
        scrollAmount += 1;
        if (scrollAmount >= slider.scrollWidth / 2) {
          scrollAmount = 0;
        }
        slider.scrollTo({
          left: scrollAmount,
          behavior: "auto",
        });
      }
    };

    const interval = setInterval(slide, 15);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gray-100 dark:bg-black transition-colors duration-500 overflow-hidden h-screen ">
      <div className="max-w-7xl mx-auto px-6 pt-20">
        <h2 className="text-4xl font-bold text-center mb-14 text-gray-800 dark:text-white">
          Services
        </h2>

        <div
          ref={sliderRef}
          className="flex gap-8 overflow-x-hidden scroll-smooth"
        >
          {[...services, ...services].map((service, index) => (
            <div
              key={index}
              className="min-w-[320px] md:min-w-87.5 lg:min-w-95
              bg-white dark:bg-zinc-900
              border border-gray-200 dark:border-zinc-700
              rounded-2xl p-8 shadow-lg
              hover:shadow-2xl
              transition-all duration-500
              hover:-translate-y-2"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                {service.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;