import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      {localStorage.getItem("user") ? (
        <>
          <NavLink className="nav" to="/">
            Products
          </NavLink>
          <NavLink className="nav" to="/add">
            Add Products
          </NavLink>
          <NavLink className="nav" to="/profile">
            Profile
          </NavLink>
          <NavLink
            className="nav"
            onClick={() => localStorage.clear()}
            to="/user"
          >
            Logout
          </NavLink>
          <h4 className="user">
            {" "}
            {JSON.parse(localStorage.getItem("user")).name}
          </h4>
        </>
      ) : (
        <NavLink className="nav" to="/user">
          Login
        </NavLink>
      )}
    </div>
  );
}
