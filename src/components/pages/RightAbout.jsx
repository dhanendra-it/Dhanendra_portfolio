import Ui from "../../assets/OIP.webp";
import Fe from "../../assets/f1.jpg";
import Fs from "../../assets/f2.webp";

const RightAbout = () => {
  const Projects = [
    { path: Ui, name: "UI/UX Design", projects: "5 Projects" },
    { path: Fe, name: "Front End Develop", projects: "5 Projects" },
    { path: Fs, name: "MERN Stack", projects: "2 Projects" },
  ];

  return (
    <div className="w-full lg:w-1/3 px-6">
      <div className="bg-[#cfd9df] dark:bg-[#0f2d53] p-6 md:p-8 rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
        <div className="space-y-4">
          {Projects.map((elem, index) => (
            <div
              className="flex items-center justify-between border-b border-gray-400 dark:border-gray-600 pb-4 last:border-none"
              key={index}
            >
              <div className="flex items-center gap-4">
                <img
                  src={elem.path}
                  alt={elem.name}
                  className="w-16 h-16 md:w-20 md:h-20 rounded object-cover"
                />
                <div>
                  <h3 className="text-gray-900 text-lg md:text-xl font-semibold dark:text-white">
                    {elem.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300 text-sm">
                    {elem.projects}
                  </p>
                </div>
              </div>

              <span className="text-green-600 text-lg md:text-xl">
                →
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightAbout;