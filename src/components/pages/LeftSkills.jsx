import React from 'react'

const LeftSkills = () => {
    const Skills = [
        {name:"React.js | Redux.js" , percentage: "95%" },
        {name:"Node.js | Express.js" , percentage: "85%"},
        {name:"MongoDb | MySql" , percentage: "75%"},
        {name:"HTML" , percentage: "98%"},
        {name:"Tailwind | CSS" , percentage: "98%"},
        
    ]
  return (
    <div >
        <h3 className="text-2xl font-semibold mb-8 border-l-4  dark:border-yellow-400 pl-4">
          Skills
        </h3>

        <div className="space-y-6">
         {Skills.map((elem , index)=> (
            <div className='transition-transform hover:scale-102' key={index}>
            <div className="flex justify-between mb-2">
              <span>{elem.name}</span>
              <span>{elem.percentage}</span>
            </div>
            <div className="w-full bg-gray-700 h-2 rounded">
              <div className="bg-yellow-400 h-2 rounded " style={{ width: elem.percentage }}></div>
            </div>
          </div>
         ))} 

        </div>
      </div>
  )
}

export default LeftSkills
