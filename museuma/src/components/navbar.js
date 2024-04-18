import React, { useState, useEffect } from "react";
import { HiArchiveBox } from "react-icons/hi2";

import Cookies from "js-cookie";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const Popup = () => {
    return (
      <div className="absolute top-16 right-0 bg-white border rounded shadow-lg p-4">
        <p>No new notifications</p>
      </div>
    );
  };

  return (
    <header className="text-[#313639] body-font z-1 shadow">
      <div className="w-full flex justify-between items-center pl-5 pt-5 pb-5 pr-2">
        <div className="flex items-center">
          <a
            href="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <img src="/logo.svg" alt="logo" className="w-12 mx-10"></img>
            <span className="ml-3 text-xl">Baker Museum</span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <a href="/exhibits" className="mr-5 hover:text-gray-900">
              Exhibits
            </a>
            <a href="/artworks" className="mr-5 hover:text-gray-900">
              Artworks
            </a>
            <a href="/tickets" className="mr-5 hover:text-gray-900">
              Tickets
            </a>
            <a href="/giftshop" className="mr-5 hover:text-gray-900">
              Gift Shop
            </a>
            <a href="/dining" className="mr-5 hover:text-gray-900">
              Dining
            </a>
          </nav>
          <div className="relative">
          <HiArchiveBox className="text-2xl cursor-pointer" onClick={togglePopup} />
          
          {isPopupOpen && <Popup />}
        </div>
        </div>
        <div className="flex items-center">
          <button className="inline-flex justify-center items-center mr-4 bg-[#EFEDE5] border-0 py-1 px-3 focus:outline-none hover:bg-[#DCD7C5] rounded text-base">
            <a href="/cart">My Cart</a>
          </button>
          {isLoggedIn ? (
            <div className="relative inline-block text-left">
              <button
                className="inline-flex justify-center items-center mr-12 bg-[#EFEDE5] border-0 py-1 px-3 focus:outline-none hover:bg-[#DCD7C5] rounded text-base ml-auto"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                More
                {/* Dropdown arrow icon */}
              </button>
              {showDropdown && (
                <div className="origin-top-right absolute right-0 mt-2 w-20 mr-12 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1" role="none">
                    <a
                      href="/profile"
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                      role="menuitem"
                    >
                      Profile
                    </a>
                    <a
                      href="/login"
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      Log Out
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <a href="/login">
              <button
                className="inline-flex justify-center items-center mr-12 bg-[#EFEDE5] border-0 py-1 px-3 focus:outline-none hover:bg-[#DCD7C5] rounded text-base ml-auto"
              >
                Log In
                {/* Login icon */}
              </button>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
