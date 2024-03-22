import React, { useState } from "react";

export default function NavBar() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    setShowLoginPopup(true);
    setShowSignUpPopup(false);
  };

  const handleSignUpClick = () => {
    setShowSignUpPopup(true);
    setShowLoginPopup(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <header className="text-[#313639] body-font z-1 shadow">
      <div className="w-full flex justify-between items-center pl-5 pt-5 pb-5 pr-2">
        <div className="flex items-center">
          
          <a
            href="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          ><img src="/logo.svg" alt="logo" className="w-12 mx-10"></img>
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
            <a href="/complaints" className="mr-5 hover:text-gray-900">
              Report a Problem
            </a>
          </nav>
        </div>
        <div className="flex items-center">
          <button className="inline-flex justify-center items-center mr-4 bg-[#EFEDE5] border-0 py-1 px-3 focus:outline-none hover:bg-[#DCD7C5] rounded text-base ml-auto">
            <a href="/cart">My Cart</a>
          </button>
          <button
            onClick={handleLoginClick}
            className="inline-flex justify-center items-center mr-12 bg-[#EFEDE5] border-0 py-1 px-3 focus:outline-none hover:bg-[#DCD7C5] rounded text-base ml-auto"
          >
            Log In
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>

          {showLoginPopup && (
            <div className="login-popup z-50 flex items-center justify-center">
              <div className="login-popup-inner bg-[#EFEDE5] rounded-lg shadow-lg p-8 relative">
                <button
                  onClick={() => setShowLoginPopup(false)}
                  className="absolute top-2 left-2 bg-[#DCD7C5] text-black rounded-full w-6 h-6 flex items-center justify-center hover:bg-[#C4BFAC]"
                >
                  X
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center text-[#333]">
                  Login
                </h2>
                <form>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 mb-4 border border-[#DCD7C5] rounded"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-6 border border-[#DCD7C5] rounded"
                  />

                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[#DCD7C5] text-black rounded hover:bg-[#C4BFAC]"
                  >
                    Log in
                  </button>
                </form>
                <div className="flex items-center justify-center mt-4 mb-2">
                  <div className="border-t border-[#DCD7C5] flex-grow"></div>
                  <p className="px-2 ">Don't have an account?</p>
                  <div className="border-t border-[#DCD7C5] flex-grow"></div>
                </div>

                <button
                  onClick={handleSignUpClick}
                  className="w-full py-2 px-4 bg-[#DCD7C5] text-black rounded hover:bg-[#C4BFAC] mt-2"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
          {showSignUpPopup && (
            <div className="login-popup z-50 flex items-center justify-center">
              <div className="login-popup-inner bg-[#EFEDE5] rounded-lg shadow-lg p-8 relative">
                <button
                  onClick={() => setShowSignUpPopup(false)}
                  className="absolute top-2 left-2 bg-[#DCD7C5] text-black rounded-full w-6 h-6 flex items-center justify-center hover:bg-[#C4BFAC]"
                >
                  X
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center text-[#333]">
                  Sign up
                </h2>
                <form>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 mb-4 border border-[#DCD7C5] rounded"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-6 border border-[#DCD7C5] rounded"
                    onChange={handlePasswordChange}
                  />
                  {password.length < 6 && (
                    <p className="text-red-500 text-xs -mt-4">
                      * Password must be at least 6 characters
                    </p>
                  )}
                  {password.length >= 6 && (
                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-[#DCD7C5] text-black rounded hover:bg-[#C4BFAC]"
                    >
                      Sign up
                    </button>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
