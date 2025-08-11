import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Contextsfetch } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(Contextsfetch);
  const location = useLocation();

  // Only check once if user is on signin page
  const isSigninPage = location.pathname === "/signin";

  // authUser is stored as string in localStorage (could be username or JSON string)
  const [authUser, setAuthUser] = useState(localStorage.getItem("authUser"));

  useEffect(() => {
    setAuthUser(localStorage.getItem("authUser"));
  }, [location.pathname]);

  const findCurrentLocation = () => {
    switch (location.pathname) {
      case "/employeelist":
        return "Employee List";
      case "/employeeEdit":
        return "Employee Edit";
      case "/createEmployee":
        return "Create Employee";
      default:
        return "Dashboard";
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <div>
      <nav className="flex justify-between items-center  bg-black text-white text-lg font-bold p-4">
        {!isSigninPage && (
          <div className="flex gap-16">
            <button onClick={() => navigate("/")} className="hover:text-gray-300">
              Home
            </button>
            <button onClick={() => navigate("/employeelist")} className="hover:text-gray-300">
              Employee List
            </button>
          </div>
        )}
        {!isSigninPage && (
          <div className="flex gap-16">
            <span>{authUser || "Guest"}</span>
            <button className="hover:text-gray-300" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </nav>

      {!isSigninPage && (
        <div className="bg-gray-200 p-4 rounded-md shadow-md">
          <p className="text-2xl font-bold text-purple-900">{findCurrentLocation()}</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
