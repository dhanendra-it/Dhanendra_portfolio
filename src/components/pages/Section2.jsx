import React from 'react'
import { LanguageBar , SkillsSlider } from './LanguageBar'
import AboutSection from './AboutSection'

const Section2 = () => {
  return (
    <div className='bg-[#c3cfe2] dark:bg-dark-third mt-10 pb-15'>
      <LanguageBar/>
      <SkillsSlider/>
      <AboutSection/>
    </div>
  )
}

export default Section2
