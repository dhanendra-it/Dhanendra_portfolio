import HeroContent from "./HeroContent";
import HeroImg from "./HeroImg";

const Section1 = () => {
  return (
    <div className="flex justify-center items-center px-4">
      <div className="w-full lg:w-5/6 flex flex-col lg:flex-row items-center justify-evenly py-12 lg:py-20 bg-[#c3cfe2] dark:bg-dark-third mt-8 rounded-3xl gap-10">
        <HeroImg />
        <HeroContent />
      </div>
    </div>
  );
};

export default Section1;