import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authReducer";
function Navbar({ googleUser }) {
  const user= useSelector(state => state.auth.user)
  console.log(user,"REDUX USER")
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleGoogleLogout = () => {
    window.open(`http://localhost:8000/api/auth/googleLogout/${googleUser._id}`, "_self");
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link style={{ textDecoration: "none" }} to="/">
          <h1 className="logo">WANDERERS</h1>
        </Link>

        {!user && !googleUser ? (
          <div className="navItems">
            <button className="navButton" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="navButton" onClick={() => navigate("/register")}>Register</button>
          </div>
        ) : (
          <div>
            {user && <span style={{ marginRight: "10px" }}>{user.username}</span>}
            {googleUser && <span style={{ marginRight: "10px" }}>{googleUser.name}</span>}
            {user && <button className="navButton" onClick={handleLogout}>
              LOGOUT
            </button>}
            {googleUser && <button className="navButton" onClick={handleGoogleLogout}>
              LOGOUT
            </button>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
