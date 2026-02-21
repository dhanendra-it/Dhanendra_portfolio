import React from "react";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Footer from "./Footer";

const Whole = () => {
  return (
    <div className="dark:bg-dark-primary transition-colors duration-500 ease-in-out">
      {/* section one */}
      <div className="pt-23">
        <Section1 />
        {/* other sections */}
      </div>
      {/* section 2 */}
      <Section2 />
      {/* Section 3 */}
      <Section3 />
      {/* Section 4 */}
      <Section4 />
      {/* Section 5 */}
      <Footer />
    </div>
  );
};

export default Whole;
