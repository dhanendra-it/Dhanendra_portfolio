import Dhruv from "../../assets/dhruv-neww.png";
import { BsStars } from "react-icons/bs";
import { PiStarFourFill } from "react-icons/pi";

const HeroImg = () => {
  return (
    <div className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-100 lg:h-95">

      {/* Floating Stars */}
      <span className="absolute top-15 left-6 text-blue-400 text-lg lg:text-xl">
        <BsStars />
      </span>

      <span className="absolute top-15 right-6 text-purple-400 text-sm">
        <PiStarFourFill />
      </span>

      <span className="absolute top-3/4 left-2 text-purple-400 text-sm z-10">
        <PiStarFourFill />
      </span>

      <span className="absolute bottom-6 right-2 text-blue-300 text-2xl z-1">
        <BsStars />
      </span>

      {/* Background Shape */}
      <div className="absolute bottom-0 w-full h-3/4 bg-[#cfd9df] dark:bg-dark-four rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 ease-in-out hover:scale-105"></div>

      {/* Image */}
      <img
        src={Dhruv}
        alt="Dhanendra"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 sm:w-64 lg:w-80 transition-all duration-300 ease-in-out hover:scale-105"
      />
    </div>
  );
};

export default HeroImg;