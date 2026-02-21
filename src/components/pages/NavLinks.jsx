import React from "react";

const NavLinks = () => {
  const NavLinks = [
    {name: "Home" , url: ""},
    { name: "About" ,url: "About"},
    { name: "Services" ,url: "Services"},
    { name: "Contact" ,url: "Contact"}
  ];
  return (
    <div className="hidden lg:block">
      <ul className="flex gap-15 text-sm backdrop-blur-lg  border-gray-50  px-3 py-2 rounded-md ">
        {NavLinks.map((link, index) => (
          <li key={index} className="dark:text-white">
            <a aria-current="page" class="" href={`/${link.url}`} data-discover="true">
              <div class="relative overflow-hidden cursor-pointer group">
                <div class="transition-transform duration-300 ease-out group-hover:-translate-y-full">
                  {link.name}
                </div>

                <div
                  class="absolute inset-0 translate-y-full transition-transform duration-300 ease-out 
                    group-hover:translate-y-0 group-hover:text-[#0548ff]"
                >
                  {link.name}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavLinks;
