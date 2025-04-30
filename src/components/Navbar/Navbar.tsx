// src/components/Navbar/Navbar.tsx
import React from "react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import logo from '../assets/logo.png'; // adjust the path as needed
import { Link } from 'react-router-dom';

import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src="/olivebranch.png" alt="Olive Branch logo" />
        <span className="navbar-brand-text">Olive Branch</span>
      </Link>
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <DropdownMenu />
      </div>
    </nav>
  );
};

export default Navbar;
