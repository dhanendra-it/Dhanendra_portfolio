import React from "react";
import HeroButton from "./HeroButton";

const HeroContent = () => {
  return (
    <div className="flex flex-col gap-10 text-center lg:text-left">

      {/* Heading Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-800 dark:text-white">
          I'm
        </h1>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-normal text-[#3e4d67d0] dark:text-slate-100">
          Dhanendra
        </h1>

        <h6 className="text-sm sm:text-base lg:text-lg text-gray-500">
          Dhanendra Choudhary - Software Developer
        </h6>

        <hr className="w-1/2 mx-auto lg:mx-0 h-0.5 bg-slate-800 dark:bg-white border-none rounded-3xl mt-5" />
      </div>

      {/* Description + Button */}
      <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start justify-between">

        <p className="text-sm sm:text-base tracking-wide text-gray-700 dark:text-slate-400 max-w-md">
          Full-stack developer focused on creating scalable web applications
          with modern frontend technologies and powerful backend architectures. :)
        </p>

        <div className="flex flex-col gap-2">
          <HeroButton />
        </div>

      </div>
    </div>
  );
};

export default HeroContent;