import ReactLogo from "../../assets/react-logo.png";
import NodeLogo from "../../assets/node.png";
import ReduxLogo from "../../assets/redux.png";
import ExpressLogo from "../../assets/express1.png";
import CssLogo from "../../assets/css.png";
import JsLogo from "../../assets/js.png";
import HtmlLogo from "../../assets/html.png";
import MongoLogo from "../../assets/mongo.png";

const LanguageBar = () => {
  const Logos = [
    { name: ReactLogo, width: "w-12 md:w-14" },
    { name: NodeLogo, width: "w-20 md:w-24" },
    { name: ReduxLogo, width: "w-10 md:w-12" },
    { name: ExpressLogo, width: "w-16 md:w-20" },
    { name: CssLogo, width: "w-8 md:w-10" },
    { name: JsLogo, width: "w-8 md:w-10" },
    { name: HtmlLogo, width: "w-8 md:w-10" },
    { name: MongoLogo, width: "w-24 md:w-32" },
  ];

  return (
    <div className="grid place-items-center px-4">
      <div className="bg-[#fffffff8] dark:bg-[#0f2d53] 
                      py-6 md:py-8 
                      px-6 md:px-10 
                      flex flex-wrap 
                      justify-center 
                      items-center 
                      gap-6 md:gap-10 
                      rounded-xl">

        {Logos.map((elem, index) => (
          <img
            src={elem.name}
            alt="tech-logo"
            className={`transition-all duration-300 ease-in-out hover:scale-110 ${elem.width}`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default LanguageBar;