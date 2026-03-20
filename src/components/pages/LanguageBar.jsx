import React from "react";
import ReactLogo from "../../assets/react-logo.png";
import NodeLogo from "../../assets/node.png";
import ReduxLogo from "../../assets/redux.png";
import ExpressLogo from "../../assets/express1.png";
import CssLogo from "../../assets/css.png";
import JsLogo from "../../assets/js.png";
import HtmlLogo from "../../assets/html.png";
import MongoLogo from "../../assets/mongo.png";

const logos = [
  ReactLogo,
  NodeLogo,
  ReduxLogo,
  ExpressLogo,
  CssLogo,
  JsLogo,
  HtmlLogo,
  MongoLogo,
];

export function LanguageBar() {
  return (
    <div className="w-full py-10 bg-white dark:bg-[#0b1120] border-y border-gray-200 dark:border-gray-800">
      
      <div className="relative max-w-6xl mx-auto overflow-hidden">

        {/* fade */}
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white dark:from-[#0b1120] to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white dark:from-[#0b1120] to-transparent z-10" />

        {/* TRACK */}
        <div className="flex w-max animate-scroll">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-8 md:px-12"
            >
              <img
                src={logo}
                alt="tech"
                className="h-9 md:h-11 object-contain opacity-70 hover:opacity-100 hover:scale-105 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const skills = [
  "Web Applications",
  "Mobile Apps",
  "Desktop Apps",
  "Cloud Systems",
  "Offline Software",
  "Online Platforms",
  "Static Websites",
  "Full Stack Solutions",
  "Responsive UI",
  "REST APIs",
  "Real-time Systems",
];

export function SkillsSlider() {
  return (
    <div className="w-full py-6 bg-white dark:bg-[#0b1120] border-b border-gray-200 dark:border-gray-800">
      
      <div className="relative max-w-6xl mx-auto overflow-hidden">

        {/* fade */}
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white dark:from-[#0b1120] to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white dark:from-[#0b1120] to-transparent z-10" />

        {/* TRACK */}
        <div className="flex w-max animate-scroll-reverse">
          {[...skills, ...skills].map((item, index) => (
            <div
              key={index}
              className="px-6 md:px-8 text-sm md:text-base text-gray-600 dark:text-gray-400 whitespace-nowrap"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}