import React from "react";

const services = [
  {
    title: "Full Stack Development",
    desc: "High-performance web applications with secure backend, scalable architecture and modern UI for real-world business needs.",
    tech: "React • Node.js • Express • MongoDB",
  },
  {
    title: "ERP Software",
    desc: "Complete business management systems including billing, inventory, staff tracking and advanced analytics dashboard.",
    tech: "MERN • Role-based Auth • Reports",
  },
  {
    title: "Mobile App Development",
    desc: "Fast, smooth and modern mobile apps with real-time data, notifications and excellent user experience.",
    tech: "React Native • Firebase • APIs",
  },
  {
    title: "Desktop Applications",
    desc: "Powerful desktop software that works offline and online for billing systems, tools and internal operations.",
    tech: "Electron.js • Node • SQLite",
  },
  {
    title: "Cloud & Deployment",
    desc: "Deploy scalable apps with zero downtime, high security and optimized cloud infrastructure.",
    tech: "AWS • Vercel • Docker",
  },
  {
    title: "Offline Sync Systems",
    desc: "Applications that work without internet and automatically sync data when online, perfect for shops & field work.",
    tech: "IndexedDB • Sync APIs • Service Workers",
  },
];

const Services = () => {
  return (
    <section className="min-h-screen py-28 bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] dark:from-[#020617] dark:to-[#0f172a]">

      <div className="max-w-7xl mx-auto px-6">

        {/* 🔥 HEADING */}
        <h2 className="text-5xl font-bold text-center mb-20 
        bg-gradient-to-r from-[#1e293b] via-[#64748b] to-[#94a3b8]
        dark:from-white dark:via-gray-300 dark:to-gray-500
        bg-clip-text text-transparent">
          My Services
        </h2>

        {/* 🔥 GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {services.map((s, i) => (
            <div
              key={i}
              className="group rounded-3xl p-8 
              bg-white/80 dark:bg-[#0f172a]
              backdrop-blur-xl
              border border-gray-200 dark:border-gray-700
              shadow-md hover:shadow-2xl
              transition duration-300
              hover:-translate-y-2"
            >
              {/* Title */}
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                {s.title}
              </h3>

              {/* Desc */}
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {s.desc}
              </p>

              {/* Tech */}
              <p className="text-sm font-medium text-indigo-500">
                ⚙ {s.tech}
              </p>

              {/* Hover Line */}
              <div className="mt-6 h-[2px] w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full"></div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Services;