import React from "react";
import LeftAbout from "./LeftAbout";
import RightAbout from "./RightAbout";

const AboutSection = () => {
  return (
    <div className="
      flex 
      flex-col md:flex-row 
      text-amber-300 
      justify-evenly 
      items-center 
      gap-10 
      mt-20 
      px-6 md:px-16
    ">
      <LeftAbout />
      <RightAbout />
    </div>
  );
};

export default AboutSection;