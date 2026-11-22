import React from 'react'
const Tools = () => {
const Tools = [
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "Redux",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  },
  {
    name: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "Postman",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  },
  {
  name: "Vite",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
},
{
  name: "Blender",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg",
},
{
  name: "M Compass",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
},
{
  name: "VS Code",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
}
,
{
  name: "DeepSeek",
  logo: "https://cdn.simpleicons.org/deepseek",
},
{
  name: "Antigravity",
  logo: "https://cdn.simpleicons.org/google",
},
{
  name: "Claude Code",
  logo: "https://cdn.simpleicons.org/claude",
},
{
  name: "Codex",
  logo: "https://cdn.simpleicons.org/openai",
},
{
  name: "Git",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
},
{
  name: "GitHub",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
},
{
  name: "MariaDB",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg",
},
{
  name: "Docker",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
},
{
  name: "Gemini",
  logo: "https://cdn.simpleicons.org/googlegemini",
},
{
  name: "Android Studio",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg",
}
];

  return (
    <section className="  dark:bg-[#0f0f0f] text-white px-6">
      <div className="max-w-6xl mx-auto">

        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {Tools.map((tool, index) => (
            <div
              key={index}
              className="bg-primary dark:bg-[#1a1a1a] rounded-xl p-6 flex flex-col items-center justify-center 
                         hover:scale-105 hover:bg-slate-600 dark:hover:bg-[#222] transition duration-300 shadow-md"
            >
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-12 h-12 mb-4"
              />
              <p className="text-sm font-medium text-slate-700 dark:text-gray-300">
                {tool.name}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Tools
