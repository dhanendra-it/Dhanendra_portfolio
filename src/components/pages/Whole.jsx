import React from "react";
import Hero from "./Hero";
import Projects from "./Projects";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Footer from "./Footer";
import  CertificateSlider from "./CertificateSlider";
import Testimonials from "./Testimonial";

const Whole = () => {
  return (
    <div className="dark:bg-dark-primary transition-colors duration-500 ease-in-out">
 
      {/* section one */}
      <Hero />
      
      {/* projects — pinned horizontal scroll */}
      <Projects />

      {/* Section 3 */}
      <Section3 />

      {/* certificate section */}
      < CertificateSlider/>

      <Testimonials/>

      {/* Section 4 */}
      <Section4 />
            
      {/* {footer} */}
      <Footer />
    </div>
  );
};

export default Whole;
