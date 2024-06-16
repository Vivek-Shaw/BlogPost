import React, { useState } from "react";
import { Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.jpeg";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  // console.log(authStatus);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  // const linksContainerRef = useRef(null);
  // const linksRef = useRef(null);

  const toggleButton = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  // const linkStyle = {
  //   height: isOpen
  //     ? `${linksRef.current.getBoundingClientRect().height}px`
  //     : "10px",
  // };
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
    },
    // {
    //   name: "HomeTemp",
    //   slug: "/home-temp",
    //   active: true,
    // },
  ];
  return (
    <header className="py-3 shadow bg-slate-100">
      <nav className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          <div className="flex items-center">
            <Link to="/">
              <Logo logo={logo} classVar="h-10 rounded-3xl" />
            </Link>
          </div>
          {/* navLinks */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <ul className="flex ml-auto md:gap-2">
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}
                {authStatus && (
                  <li>
                    <LogoutBtn />
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              onClick={toggleButton}
              className="inline-flex items-center p-2 w-10 h-10  
            text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 
            focus:outline-none 
             dark:text-gray-400  transition-all 
             duration-100 ease-linear hover:rotate-90"
            >
              {isOpen === true ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>
      {/* mobile-menu */}
      {isOpen ? (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <ul className="flex flex-col ml-auto md:gap-2">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
