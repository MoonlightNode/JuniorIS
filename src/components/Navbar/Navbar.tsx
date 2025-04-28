// src/components/Navbar/Navbar.tsx
import React from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Olive Branch</div>
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <DropdownMenu />
      </div>
    </nav>
  );
};

export default Navbar;
