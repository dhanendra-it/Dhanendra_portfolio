import React from "react";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Footer from "./Footer";
import Section5 from "./Section5";
import  CertificateSlider from "./CertificateSlider";

const Whole = () => {
  return (
    <div className="dark:bg-dark-primary transition-colors duration-500 ease-in-out">
 
      {/* section one */}
      <div className="pt-23 pb-10">
        <Section1 />
      </div>
      
      {/* section 2 */}
      <Section2 />

      {/* section projects */}
      <Section5/>

      {/* Section 3 */}
      <Section3 />

      {/* certificate section */}
      < CertificateSlider/>

      {/* Section 4 */}
      <Section4 />
            
      {/* {footer} */}
      <Footer />
    </div>
  );
};

export default Whole;
