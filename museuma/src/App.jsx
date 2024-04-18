import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./App.css";
import "./index.css";
import Home from "./pages/Home";
import Dining from "./pages/dining";
import Complaints from "./pages/complaints";
import Artworks from "./pages/artworks";
import Exhibits from "./pages/exhibits";
import Giftshop from "./pages/giftshop";
import Tickets from "./pages/tickets";
import ShoppingCart from "./pages/shoppingCart";
import Checkout from "./pages/checkout";
import AdminHome from "./adminPages/Home";
import ManageEmployees from "./adminPages/manageEmployees";
import TotalReport from "./adminPages/totalReport";
import ManageExhibit from "./adminPages/manageExhibits";
import ManageArtwork from "./adminPages/manageArtworks";
import ViewComplaints from "./adminPages/viewComplaints";
import ManageGiftshop from "./adminPages/manageGiftshop";
import EditProfile from "./pages/editProfile";
import ExhibitReport from "./adminPages/exhibitReport";
import ManageRestaurant from "./adminPages/manageRestaurant";
import Login from "./components/login";
import Signup from "./components/signup";
import AdminLogin from "./components/adminLogin";

function App() {
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = Cookies.get("token");
      if (storedToken) {
        const { table_name } = await decodeToken(storedToken);
        setUserRole(table_name);
      } else {
        console.log("No user logged in");
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const decodeToken = async (token) => {
    try {
      const response = await fetch("http://localhost:8081/decodeToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      if (response.ok) {
        const decodedToken = await response.json();
        const { table_name } = decodedToken;
        return { table_name };
      } else {
        console.error("Failed to decode token:", response.statusText);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
    return { table_name: null };
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/giftshop" element={<Giftshop />} />
        <Route path="/exhibits" element={<Exhibits />} />
        <Route path="/artworks" element={<Artworks />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute
              element={<EditProfile />}
              allowedRoles={["employees", "branch_directors", "customers"]}
              userRole={userRole}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute
              element={<AdminHome />}
              allowedRoles={["branch_directors"]}
              userRole={userRole}
            />
          }
        />
        <Route
          path="/admin/manage-employees"
          element={
            <PrivateRoute
              element={<ManageEmployees />}
              allowedRoles={["branch_directors"]}
              userRole={userRole}
            />
          }
        />
        <Route
          path="/admin/total-report"
          element={
            <PrivateRoute
              element={<TotalReport />}
              allowedRoles={["branch_directors"]}
              userRole={userRole}
            />
          }
        />
        <Route
          path="/admin/manage-exhibits"
          element={
            <PrivateRoute
              element={<ManageExhibit />}
              allowedRoles={["branch_directors"]}
              userRole={userRole}
            />
          }
        />
        <Route
          path="/admin/manage-artworks"
          element={
            <PrivateRoute
              element={<ManageArtwork />}
              allowedRoles={["branch_directors"]}
              userRole={userRole}
            />
          }
        />
        <Route
          path="/admin/view-complaints"
          element={
            <PrivateRoute
              element={<ViewComplaints />}
              allowedRoles={["branch_directors"]}
              userRole={userRole}
            />
          }
        />
        <Route
          path="/admin/manage-giftshop"
          element={
            <PrivateRoute
              element={<ManageGiftshop />}
              allowedRoles={["branch_directors"]}
              userRole={userRole}
            />
          }
        />
        <Route
          path="/admin/exhibit-report"
          element={
            <PrivateRoute
              element={<ExhibitReport />}
              allowedRoles={["branch_directors"]}
              userRole={userRole}
            />
          }
        />
        <Route
          path="/admin/manage-restaurant"
          element={
            <PrivateRoute
              element={<ManageRestaurant />}
              allowedRoles={["branch_directors"]}
              userRole={userRole}
            />
          }
        />
      </Routes>
    </Router>
  );
}

function PrivateRoute({ element, allowedRoles, userRole }) {
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles.includes(userRole)) {
    return element;
  } else {
    return <Navigate to="/" replace />;
  }
}

export default App;
