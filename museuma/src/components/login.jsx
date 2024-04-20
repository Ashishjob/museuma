import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      console.log("Stored token (test):", storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://museuma.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Set the token in cookies
        Cookies.set("token", token);
        setIsLoggedIn(true);

        // Redirect to home page
        navigate("/");
        window.location.reload();

        // Retrieve the token from cookies
        const storedToken = Cookies.get("token");

        // Optionally, you can use the stored token for further actions
        console.log("Stored token:", storedToken);

        // Reload the window or redirect to another page
        // window.location.reload();
        console.log("Login successful");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-[#EFEDE5]">
      <div className="bg-white rounded-lg shadow-lg p-8">
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

        <a href="/signup">
          <button className="w-full py-2 px-4 bg-[#DCD7C5] text-black rounded hover:bg-[#C4BFAC] mt-2">
            Sign Up
          </button>
        </a>
        <div className="flex items-center justify-center mt-4 mb-2">
          <div className="border-t border-[#DCD7C5] flex-grow"></div>
          <p className="px-2 ">Are you an administrator?</p>
          <div className="border-t border-[#DCD7C5] flex-grow"></div>
        </div>
        <a href="/admin-login">
          <button className="w-full py-2 px-4 bg-[#DCD7C5] text-black rounded hover:bg-[#C4BFAC] mt-2">
            Admin Login
          </button>
        </a>
      </div>
    </main>
  );
}

export default Login;
