import React from 'react'

const RightSkill = () => {
    const Experience = [
        {
            name:"Full Stack Developer",
            year:"2025 - Present",
            description:"Building MERN stack applications with authentication, REST APIs, state management using Redux and deploying projects on hosting platforms."
        },
        {
            name:"Frontend Developer",
            year:"2024",
            description:" Developed responsive UI using React and Tailwind CSS. Focused on animations, UI/UX, and performance optimization."
        },
    ]
  return (
     <div>
        <h3 class="text-2xl font-semibold mb-8 border-l-4 dark:border-yellow-400 pl-4">
          Experience
        </h3>

        <div class="relative border-l border-gray-600 pl-8 space-y-12">

         {Experience.map((elem,index) => (
            <div class="relative" key={index}>
            <div class="absolute -left-4 top-1 w-4 h-4  bg-yellow-400 rounded-full"></div>
            <span class="ml-2 text-sm text-gray-400">{elem.year}</span>
            <h4 class="text-lg font-semibold mt-1">
              {elem.name}
            </h4>
            <p class="text-gray-400 text-sm mt-2">
              {elem.description}
            </p>
          </div>
         ))} 

        </div>
        </div>
  )
}

export default RightSkill
