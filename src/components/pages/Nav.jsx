import { useState, useEffect } from "react";
import logo from "../../assets/my_logo.png";
import CV from "../../assets/Dhanendra-CV.pdf";
import { TbBrandLinkedinFilled } from "react-icons/tb";
import { FaSquareGithub } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { ArrowUpRight } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";

const Header = ({ toggleDarkMode, darkMode }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // same query as hero.css: below this the hero is stacked (dark top), above it split (cream on the right)
  const [stacked, setStacked] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1099px), (max-aspect-ratio: 7/5)");
    const on = () => setStacked(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Handle scroll for hide/show and scrolled state
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 60);

      if (Math.abs(currentScrollY - lastScrollY) < 10) return;
      setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 60);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Handle section clicks on mobile
  const handleNavClick = (href, to) => {
    setMobileOpen(false);
    if (to) {
      navigate(to);
      return;
    }
    if (href) {
      if (isHome) {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(`/${href}`);
      }
    }
  };

  const navItems = [
    { n: "01", label: "Work", href: "#project" },
    { n: "02", label: "Certificates", href: "#certificates" },
    { n: "03", label: "Skills", href: "#skills" },
    { n: "04", label: "About", to: "/About" },
    { n: "05", label: "Services", to: "/Services" },
    { n: "06", label: "Contact", to: "/Contact" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 h-16 sm:h-20 w-full z-40 flex items-center transition-all duration-300 ${
          isHome && !isScrolled
            ? `justify-between px-4 sm:px-6 lg:px-10 bg-transparent ${stacked ? "text-white" : "text-[#121212] dark:text-[#ece6da]"}`
            : "justify-between px-4 sm:px-6 lg:px-16 backdrop-blur-xl bg-[#e9e4da]/85 dark:bg-[#0c0c0e]/85 border-b border-black/5 dark:border-white/10 text-neutral-900 dark:text-white shadow-xs"
        } ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* LOGO */}
        <div className="flex items-center">
          {isHome ? (
            <a
              href="/"
              className={`font-serif text-2xl sm:text-3xl font-normal transition-opacity duration-300 ${
                isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              DC<i className="not-italic text-[#e04a1f]">.</i>
            </a>
          ) : (
            <Link to="/" className="flex items-center gap-2 group" aria-label="Home">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-black/10 dark:border-white/10 p-1 bg-white/50 dark:bg-neutral-900">
                <img src={logo} alt="logo" className="w-full h-full object-contain" />
              </div>
              <span
                className="font-serif text-xl sm:text-2xl font-normal"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                DC<i className="not-italic text-[#e04a1f]">.</i>
              </span>
            </Link>
          )}
        </div>

        {/* DESKTOP LINKS (on non-home or when scrolled on home) */}
        {!isHome && (
          <div className="relative z-10">
            <NavLinks />
          </div>
        )}

        {/* RIGHT SECTION: THEME TOGGLE, SOCIALS, HAMBURGER */}
        <div className="flex items-center gap-3 sm:gap-5 relative z-10">
          {/* DARK MODE */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            {darkMode ? (
              <BsFillMoonStarsFill className="text-xl sm:text-2xl text-yellow-400" />
            ) : (
              <IoSunny className={`text-xl sm:text-2xl ${isHome && !isScrolled ? "text-amber-300" : "text-amber-500"}`} />
            )}
          </button>

          {/* SOCIALS (DESKTOP) */}
          <div className="hidden lg:flex gap-2 items-center">
            <a
              href="https://linkedin.com/in/dhanendra-it"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-1 hover:text-[#e04a1f] transition"
            >
              <TbBrandLinkedinFilled className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/dhanendra-it"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-1 hover:text-[#e04a1f] transition"
            >
              <FaSquareGithub className="w-6 h-6" />
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open menu"
            className="lg:hidden p-2 rounded-lg text-2xl hover:bg-black/5 dark:hover:bg-white/10 transition"
          >
            {mobileOpen ? <HiX /> : <HiOutlineMenu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU DRAWER */}
      <div
        className={`fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-[#f4efe6] dark:bg-[#0e0e11] text-neutral-900 dark:text-neutral-100 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col justify-between p-6 sm:p-8 overflow-y-auto ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* DRAWER TOP BAR */}
          <div className="flex items-center justify-between pb-6 border-b border-black/10 dark:border-white/10">
            <span
              className="font-serif text-2xl"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              DC<i className="not-italic text-[#e04a1f]">.</i>
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition text-2xl"
            >
              <HiX />
            </button>
          </div>

          {/* NAVIGATION LINKS */}
          <div className="flex flex-col mt-6 gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavClick(item.href, item.to)}
                className="flex items-baseline gap-4 py-3 px-3 rounded-lg text-left hover:bg-black/5 dark:hover:bg-white/5 transition group"
              >
                <span className="text-xs font-mono opacity-50 tracking-widest text-[#e04a1f]">
                  {item.n}
                </span>
                <span
                  className="text-2xl font-serif tracking-wide group-hover:text-[#e04a1f] transition-colors"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* DRAWER FOOTER */}
        <div className="pt-6 border-t border-black/10 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-3 text-2xl">
              <a
                href="https://linkedin.com/in/dhanendra-it"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="hover:text-[#e04a1f] transition"
              >
                <TbBrandLinkedinFilled />
              </a>
              <a
                href="https://github.com/dhanendra-it"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="hover:text-[#e04a1f] transition"
              >
                <FaSquareGithub />
              </a>
            </div>
            <a
              href={CV}
              download
              className="text-xs tracking-wider uppercase font-semibold text-[#e04a1f] inline-flex items-center gap-1 hover:underline"
            >
              CV <ArrowUpRight size={14} />
            </a>
          </div>
          <p className="text-[11px] uppercase tracking-widest opacity-60">
            Dhanendra Choudhary · 2026
          </p>
        </div>
      </div>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity"
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;