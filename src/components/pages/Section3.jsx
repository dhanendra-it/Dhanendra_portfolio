import React from 'react'
import LeftSkills from './LeftSkills'
import RightSkill from './RightSkill'
import Tools from './Tools'

const Section3 = () => {
  return (
    <section className="w-full dark:bg-[#0f0f0f] dark:text-white py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
    
    
    <div className='flex  justify-center'>
        <h2 className="text-5xl md:text-4xl font-bold mb-12  text-slate-800 dark:text-white border-slate-300 border-y  pb-2">
      Skills & Experience
    </h2>
    </div>

    <div className="grid md:grid-cols-2 gap-16">
      
      <LeftSkills/>   
      <RightSkill/>

    </div>

    <div className='flex  justify-center mt-20 flex-col'>
        <div className='flex justify-center items-center'><h2 className="text-5xl md:text-4xl font-bold mb-12  text-slate-800 dark:text-white border-slate-300 border-y  pb-2">Tools I Use</h2></div>
      
    
    <Tools/>
    </div>
  </div>
</section>
  )
}

export default Section3
