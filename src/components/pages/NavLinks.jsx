import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/About" },
  { name: "Services", path: "/Services" },
  { name: "Contact", path: "/Contact" },
];

const NavLinks = () => {
  const location = useLocation();

  return (
    <div className="hidden lg:block">
      <ul className="flex items-center gap-10 text-sm font-medium">
        {navItems.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <li key={link.name} className="relative">
              <Link
                to={link.path}
                className={`transition-colors duration-200 block py-1 ${
                  isActive
                    ? "text-[#e04a1f] font-semibold"
                    : "text-neutral-700 dark:text-neutral-200 hover:text-[#e04a1f] dark:hover:text-[#e04a1f]"
                }`}
              >
                <div className="relative overflow-hidden cursor-pointer group">
                  <div className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    {link.name}
                  </div>
                  <div className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 text-[#e04a1f]">
                    {link.name}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavLinks;
