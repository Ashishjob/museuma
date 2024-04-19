import React, { useState, useEffect } from "react";
import { HiArchiveBox } from "react-icons/hi2";

import Cookies from "js-cookie";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userFirstName, setUserFirstName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [employeeDepartment, setEmployeeDepartment] = useState("");
  const [hasUnresolvedMessages, setHasUnresolvedMessages] = useState(false);
  const [queue, setQueue] = useState([]);

  const decodeToken = async (token) => {
    try {
      const response = await fetch("http://localhost:8081/decodeToken", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      if (response.ok) {
        const decodedToken = await response.json();
        const { user_id, table_name } = decodedToken;

        // Log the values for verification
        console.log("User ID:", user_id);
        console.log("Table Name:", table_name);

        // Return user_id and table_name
        return { user_id, table_name };
      } else {
        console.error("Failed to decode token:", response.statusText);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }

    // If there's an error or response is not ok, return null or handle the error as needed
    return null;
  };

  const getFirstName = async (user_id, table_name) => {
    try {
      const response = await fetch("http://localhost:8081/getFirstName", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, table_name }),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch first name:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error fetching first name:", error);
      return null;
    }
  };

  const getEmployeeDepartment = async (employee_id) => {
    try {
      const response = await fetch("http://localhost:8081/employee-department", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employee_id }),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch employee department:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error fetching employee department:", error);
      return null;
    }
  }

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setIsLoggedIn(true);
      decodeToken(storedToken).then((data) => {
        if (data) {
          const { user_id, table_name } = data;
          console.log("User ID:", user_id);
          console.log("Table Name:", table_name);
          // Set userRole state
          setUserRole(table_name);
          console.log("User Role:", table_name); // Log updated userRole
          // Call getFirstName with user_id and table_name
          getFirstName(user_id, table_name).then((firstNameData) => {
            if (firstNameData && firstNameData.first_name) {
              setUserFirstName(firstNameData.first_name);
              console.log("updated", firstNameData.first_name);
            }
          });

          if (table_name === "employees") {
            getEmployeeDepartment(user_id).then((departmentData) => {
              if (departmentData && departmentData.department) {
                setEmployeeDepartment(departmentData.department);
                console.log("Employee Department:", departmentData.department);
              }
            });
          }
        }
      });
    }
  
    // Fetch messages and check for unresolved messages
    const fetchAndCheckMessages = async () => {
      try {
        const response = await fetch('http://localhost:8081/admin#notifications');
        const data = await response.json();
        setQueue(data);
  
        const unresolvedMessages = data.some(item => item.resolved === 0);
        setHasUnresolvedMessages(unresolvedMessages);
        console.log(unresolvedMessages);
  
        // Check if there are unresolved messages to decide if popup should be open
        if (unresolvedMessages) {
          setIsPopupOpen(true);
        } else {
          setIsPopupOpen(false);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
  
    // Check if the hash fragment is "notifications"
    if (window.location.hash === "#notifications") {
      fetchAndCheckMessages(); // Fetch messages when the popup is open
    } else {
      fetchAndCheckMessages(); // Fetch messages when the component mounts
    }
  }, []);
  
  

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:8081/admin#notifications'); // Replace with your actual API endpoint
      const data = await response.json();
      setQueue(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };



  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    
    const fetchData = async () => {
      if (!isPopupOpen) {
        window.location.hash = "notifications";
        await fetchMessages(); // Fetch messages when the popup is opened
      } else {
        window.location.hash = "";
      }
    };
  
    fetchData();
  };
  
  

  const Popup = () => {
    // Filter out messages where resolved is false
    const resolvedMessages = queue.filter(item => item.resolved === 0);

    // Check if resolvedMessages is empty
  if (resolvedMessages.length === 0) {
    return (
      <div className="absolute top-16 right-0 bg-white border rounded shadow-lg p-4 w-64">
        <p>No notifications</p>
      </div>
    );
  }

    return (
      <div className="absolute top-16 right-0 bg-white border rounded shadow-lg p-4 w-64"> {/* Added w-64 for width */}
        <ul className="text-lg"> {/* Added text-sm for smaller text */}
          {resolvedMessages.map((item, index) => (
            <li key={index}>{item.message}</li> // Adjust this based on your message structure
          ))}
        </ul>
      </div>
    );
  };
  

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setIsLoggedIn(true);
    }
  
    // Check if the hash fragment is "notifications"
    if (window.location.hash === "#notifications") {
      setIsPopupOpen(true);
    }
  }, []);
  

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
          {hasUnresolvedMessages && ( // Conditionally render the red dot
              <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></div>
            )}
          
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
                {userFirstName || "More"}
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
                    {/* Conditionally render based on userRole */}
                    {userRole === "branch_directors" && (
                      <a
                        href="/admin"
                        className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                        role="menuitem"
                      >
                        Admin
                      </a>
                    )}
                    {userRole === "employees" && (
                      <div>
                        {employeeDepartment === "Gift Shop" && (
                          <a
                            href="/admin/manage-giftshop"
                            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                            role="menuitem"
                          >
                            Manage Gift Shop
                          </a>
                        )}
                        {employeeDepartment === "Restaurant" && (
                          <a
                            href="/admin/manage-restaurant"
                            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                            role="menuitem"
                          >
                            Manage Restaurant
                          </a>
                        )}
                        {employeeDepartment !== "Gift Shop" && employeeDepartment !== "Restaurant" && (
                          <a
                            href="/admin/manage-artworks"
                            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                            role="menuitem"
                          >
                            Manage Artworks
                          </a>
                        )}
                      </div>
                    )}

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
