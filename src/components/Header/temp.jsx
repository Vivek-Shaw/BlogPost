import React, { useRef, useState } from 'react'
import {Container, Logo, LogoutBtn} from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/logo.jpeg';

const Header = () => {
    const authStatus = useSelector((state)=>state.auth.status)
    // console.log(authStatus);
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const linksContainerRef = useRef(null);
    const linksRef = useRef(null);

    const toggleButton = () => {
     
      setIsOpen(!isOpen);
      console.log(isOpen);
    };
    const linkStyle = {
      height: isOpen
        ? `${linksRef.current.getBoundingClientRect().height}px`
        : "10px",
    };
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
    ];
  return (
    <header className="py-3 shadow bg-slate-100">
      <Container>
        <nav className="flex  md:justify-between items-center ">
          <div className=" flex w-full items-center justify-between border-2 border-red-700 ">
            <Link to="/">
              <Logo logo={logo} classVar="h-10 rounded-3xl" />
            </Link>
          </div>
          <div className='m'>
            <button
              data-collapse-toggle="navbar-hamburger"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10  
            text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 
            focus:outline-none focus:ring-2 focus:ring-gray-200
             dark:text-gray-400 dark:focus:ring-gray-600 transition-all 
             duration-100 ease-linear hover:rotate-90"
              aria-controls="navbar-solid-bg"
              aria-expanded="false"
              onClick={toggleButton}
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className="overflow-hidden transition-all duration-300 ease-in-out "
            id="navbar-hamburger"
            ref={linksContainerRef}
            style={linkStyle}
          >
            <ul className="flex ml-auto md:gap-2" ref={linksRef}>
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
        </nav>
      </Container>
    </header>
  );
}

export default Header