import React from "react";

const HeroButton = () => {
  const ButtonData = [
    {ButtonText:"Contact ME  🡢" , link: "https://wa.me/918827811548"}, 
    {ButtonText:"PROJECTS  🡢" , link: "#project"},];
  
    return (<>
    {ButtonData.map((links, index) => (
    <div key={index} className=" bg-white text-black flex group cursor-pointer px-8 rounded-sm py-2 font-medium text-sm w-fit hover:bg-gray-200 transition-colors">
      <div className="relative overflow-hidden w-max cursor-pointer flex gap-1 font-marope font-medium">
        <div className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
          <a href={links.link}>{links.ButtonText}</a>
        </div>
        <div className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
          <a href={links.link}>{links.ButtonText}</a>
        </div>
      </div>
    </div>
    ))}
    </>
  );
};

export default HeroButton;
