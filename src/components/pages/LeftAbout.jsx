import React from "react";

const LeftAbout = () => {
  return (
    <div className="
      bg-[#cfd9df] 
      dark:bg-[#0f2d53] 
      text-white 
      px-6 md:px-9 
      py-12 md:py-18 
      w-full md:w-1/3 
      shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] 
      rounded-2xl
    ">
      <div className="mx-auto">

        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white">
          What Can I Do For Your Needs
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mt-4">
          It is easier to entrust the work to experts because they are able to
          provide the best results with reliable quality.
        </p>

        <div className="grid grid-cols-2 gap-8 mt-10">
          <div>
            <h3 className="text-yellow-400 text-2xl font-semibold">10+</h3>
            <p className="text-gray-500 dark:text-gray-300">
              Project Completed
            </p>
          </div>

          <div>
            <h3 className="text-yellow-400 text-2xl font-semibold">2+</h3>
            <p className="text-gray-500 dark:text-gray-300">
              Years Experience
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LeftAbout;