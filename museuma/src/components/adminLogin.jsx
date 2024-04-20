import React from 'react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function AdminLogin() {
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
            const response = await fetch('https://museuma.onrender.com/login', {
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
        <main className="flex items-center justify-center h-screen bg-[#EFEDE5]">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <button className="relative top-4 left-4">
                    <a href="/login">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                    </a>
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
        </main>
    );
}

export default AdminLogin;