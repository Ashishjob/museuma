import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function NavBar() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAdminLoginPopup, setShowAdminLoginPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    username: "",
    password: ""
  });

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken) {
      console.log("Stored token (test):", storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        
        // Set the token in cookies
        Cookies.set('token', token);
        setIsLoggedIn(true);

        // Retrieve the token from cookies
        const storedToken = Cookies.get('token');
  
        // Optionally, you can use the stored token for further actions
        console.log("Stored token:", storedToken);
  
        // Reload the window or redirect to another page
        // window.location.reload();
        console.log("Login successful");
        setShowLoginPopup(false);
      }
    }
    catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      Cookies.remove('token');
      handleLogout();
    } else {
      window.location.hash = "login";
      setShowLoginPopup(true);
      setShowSignUpPopup(false);
    }
  };

  const handleSignUpClick = async () => {
    window.location.hash = "signup";
    setShowSignUpPopup(true);
    setShowLoginPopup(false);
  };

  const handleSubmitForm = async (formData) => {
    try {
      console.log(formData);
      const response = await fetch("https://museuma.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Include the form data in the request body
      });
      if (!response.ok) {
        throw new Error("Failed to submit sign-up form");
      }
      const responseData = await response.json(); // Assuming the response contains JSON data
      console.log(responseData); // Log the response data to the console
      // Optionally, you can perform any additional actions based on the response
      // For example, show a success message or redirect the user
    } catch (error) {
      console.log(error.body);
      console.error("Error submitting sign-up form:", error);
      // Handle error as needed
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitForm(formData); // Call the handleSubmitForm function with the form data
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
            {isLoggedIn && (
              <a href="/giftshop" className="mr-5 hover:text-gray-900">
                Gift Shop
              </a>
            )}
            <a href="/dining" className="mr-5 hover:text-gray-900">
              Dining
            </a>
            {isLoggedIn && (
              <a href="/complaints" className="mr-5 hover:text-gray-900">
                Report a Problem
              </a>
            )}
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
            {isLoggedIn ? "Log Out" : "Log In"}
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
                <form onSubmit={handleLoginSubmit}>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 mb-4 border border-[#DCD7C5] rounded"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full p-2 mb-4 border border-[#DCD7C5] rounded"
                    value={formData.first_name}
                    onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-2 mb-4 border border-[#DCD7C5] rounded"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({ ...formData, last_name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 border border-[#DCD7C5] rounded"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full p-2 mb-4 border border-[#DCD7C5] rounded"
                    value={formData.phone_number}
                    onChange={(e) =>
                      setFormData({ ...formData, phone_number: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 mb-4 border border-[#DCD7C5] rounded"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-6 border border-[#DCD7C5] rounded"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  {formData.password.length < 6 && (
                    <p className="text-red-500 text-xs -mt-4">
                      * Password must be at least 6 characters
                    </p>
                  )}
                  {formData.password.length >= 6 && (
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
        </div>
      </div>
    </header>
  );
}
