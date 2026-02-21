import React from "react";

const HeroButton = () => {
  const ButtonData = [
    {ButtonText:"Contact ME  🡢" , link: ""}, 
    {ButtonText:"PROJECTS  🡢" , link: ""},];
  
    return (<>
    {ButtonData.map((link, index) => (
    <div key={index} className=" bg-white text-black flex group cursor-pointer px-8 rounded-sm py-2 font-medium text-sm w-fit hover:bg-gray-200 transition-colors">
      <div className="relative overflow-hidden w-max cursor-pointer flex gap-1 font-marope font-medium">
        <div className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
          <a href="/Contact">{link.ButtonText}</a>
        </div>
        <div className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
          {link.ButtonText}
        </div>
      </div>
    </div>
    ))}
    </>
  );
};

export default HeroButton;
