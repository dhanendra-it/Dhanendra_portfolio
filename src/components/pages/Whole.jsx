import React from "react";
import Hero from "./Hero";
import Projects from "./Projects";
import Certificates from "./Certificates";
import Skills from "./Skills";
import Tools from "./Tools";
import Footer from "./Footer";

const Whole = () => {
  return (
    <div className="dark:bg-dark-primary transition-colors duration-500 ease-in-out">
      {/* hero */}
      <Hero />

      {/* projects — pinned horizontal scroll */}
      <Projects />

      {/* certificates */}
      <Certificates />

      {/* skills + experience + tools */}
      <Skills />

      {/* tools */}
      <Tools />

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Whole;
