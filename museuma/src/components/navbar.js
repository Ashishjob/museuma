<<<<<<< Updated upstream
export default function NavBar() {
    return (
        <header className="text-[#313639] body-font z-1">
        <div className="w-full flex justify-between items-center pl-5 pt-5 pb-5 pr-2">
          <div className="flex items-center">
            <img src="./logo.svg" alt="logo" className="w-12 mx-10"></img>
            <a
              href="/local"
              className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            >
              <span className="ml-3 text-xl">Baker Museum</span>
=======
import React, { useState } from "react";
import Cookies from "js-cookie";

export default function NavBar() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);
  const [password, setPassword] = useState("");
  const [showAdminLoginPopup, setShowAdminLoginPopup] = useState(false);
  const [signUpFormData, setsignUpFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
  });

  const handleLoginClick = () => {
    window.location.hash = "login";
    setShowLoginPopup(true);
    setShowSignUpPopup(false);
  };

  const handleSignUpClick = () => {
    window.location.hash = "signup";
    setShowSignUpPopup(true);
    setShowLoginPopup(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setsignUpFormData({ ...signUpFormData, [name]: value });
  };

  const handleLoginSuccess = () => {
    // Set a cookie named "loggedIn" with some value (e.g., user's ID)
    Cookies.set("loggedIn", "true", { expires: 7 }); // Expires in 7 days

    // Hide login popup
    setShowLoginPopup(false);

    // Redirect user or perform any other necessary actions
  };

  const handleLogout = () => {
    // Remove the "loggedIn" cookie
    Cookies.remove("loggedIn");

    // Redirect user or perform any other necessary actions
  };

  const isLoggedIn = () => {
    // Check if the "loggedIn" cookie exists
    return Cookies.get("loggedIn") === "true";
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    // Send a POST request to the /signup endpoint with formData
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle success or error response
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
>>>>>>> Stashed changes
            </a>
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
              <a href="/local" className="mr-5 hover:text-gray-900">
                Our Collections
              </a>
              <a href="/local" className="mr-5 hover:text-gray-900">
                Current Exhibitions
              </a>
              <a href="/local" className="mr-5 hover:text-gray-900">
                Tickets
              </a>
              <a href="/local" className="mr-5 hover:text-gray-900">
                Gift Shop
              </a>
            </nav>
          </div>
          <button className="inline-flex justify-center items-center mr-12 bg-[#EFEDE5] border-0 py-1 px-3 focus:outline-none hover:bg-[#DCD7C5] rounded text-base mt-8 md:mt-0 ml-auto">
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
<<<<<<< Updated upstream
=======

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
                    onClick={handleLoginSuccess}
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
                <div className="flex items-center justify-center mt-4 mb-2">
                  <div className="border-t border-[#DCD7C5] flex-grow"></div>
                  <p className="px-2 ">Are you an administrator?</p>
                  <div className="border-t border-[#DCD7C5] flex-grow"></div>
                </div>
                <button
                  onClick={() => {
                    setShowAdminLoginPopup(true);
                    window.location.hash = "adminlogin";
                }}
                  className="w-full py-2 px-4 bg-[#DCD7C5] text-black rounded hover:bg-[#C4BFAC] mt-2"
                >
                  Admin Login
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
                <form onSubmit={handleSignUpSubmit}>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={signUpFormData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-4 border border-[#DCD7C5] rounded"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={signUpFormData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-4 border border-[#DCD7C5] rounded"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={signUpFormData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-4 border border-[#DCD7C5] rounded"
                  />
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={signUpFormData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-4 border border-[#DCD7C5] rounded"
                  />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={signUpFormData.username}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-4 border border-[#DCD7C5] rounded"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={signUpFormData.password}
                    className="w-full p-2 mb-6 border border-[#DCD7C5] rounded"
                    onChange={handleInputChange}
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
          {showAdminLoginPopup && (
            <div className="login-popup z-50 flex items-center justify-center">
              <div className="login-popup-inner bg-[#EFEDE5] rounded-lg shadow-lg p-8 relative">
                <button
                  onClick={() => {
                    setShowAdminLoginPopup(true);
                }}
                  className="absolute top-2 left-2 bg-[#DCD7C5] text-black rounded-full w-6 h-6 flex items-center justify-center hover:bg-[#C4BFAC]"
                >
                  X
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center text-[#333]">
                  Admin Login
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const username = e.target.elements[0].value;
                    const password = e.target.elements[1].value;
                    if (username === "admin" && password === "secure123!") {
                      // Redirect to /admin page
                      window.location.href = "/admin";
                    } else {
                      // Handle incorrect username or password
                      alert("Incorrect username or password");
                    }
                  }}
                >
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
              </div>
            </div>
          )}
>>>>>>> Stashed changes
        </div>
      </header>
    );
  }