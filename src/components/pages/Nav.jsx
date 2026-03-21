import { useState, useEffect } from "react";
import logo from "../../assets/my_logo.png";
import { TbBrandLinkedinFilled } from "react-icons/tb";
import { FaSquareGithub } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import NavLinks from "./NavLinks";

const Header = ({ toggleDarkMode, darkMode }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) < 10) return;

      setShowNavbar(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 h-20 w-full z-50 flex items-center justify-between px-6 lg:px-40
        backdrop-blur-xl bg-[#cfd9df25] dark:bg-[#1111112e]
        border-b border-white/10
        overflow-hidden
        transition-all duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >

        {/* 🔥 SHINING LINE */}
        <div className="nav-shine"></div>

        {/* LOGO */}
        <div className="relative z-10 w-20 h-12 rounded-lg shadow-lg p-2 bg-gray-700 dark:bg-dark-primary">
          <img src={logo} alt="logo" />
        </div>

        {/* DESKTOP LINKS */}
        <div className="relative z-10">
          <NavLinks />
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6 dark:text-white relative z-10">

          {/* DARK MODE */}
          <button
            onClick={toggleDarkMode}
            className="transition-all hover:scale-125"
          >
            {darkMode ? (
              <BsFillMoonStarsFill className="text-2xl" />
            ) : (
              <IoSunny className="text-2xl" />
            )}
          </button>

          {/* SOCIAL */}
          <div className="hidden lg:flex gap-2 items-center">
            <a href="https://linkedin.com/in/dhanendra-it" target="_blank">
              <TbBrandLinkedinFilled className="w-8 h-8 hover:scale-110 transition" />
            </a>
            <a href="https://github.com/dhanendra-it" target="_blank">
              <FaSquareGithub className="w-8 h-8 hover:scale-110 transition" />
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-3xl"
          >
            {mobileOpen ? <HiX /> : <HiOutlineMenu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 w-64 h-full dark:bg-black bg-white shadow-lg z-40 transform transition-transform duration-300 text-center py-5 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col mt-24 gap-8 px-8 text-lg dark:text-white">
          <a href="/" onClick={() => setMobileOpen(false)} className="bg-[#e5e1e1b2] p-2 rounded">
            Home
          </a>
          <a href="/About" onClick={() => setMobileOpen(false)} className="bg-[#e5e1e1b2] p-2 rounded">
            About
          </a>
          <a href="/Services" onClick={() => setMobileOpen(false)} className="bg-[#e5e1e1b2] p-2 rounded">
            Services
          </a>
          <a href="/Contact" onClick={() => setMobileOpen(false)} className="bg-[#e5e1e1b2] p-2 rounded">
            Contact
          </a>
        </div>
      </div>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-30"
        />
      )}
    </>
  );
};

export default Header;