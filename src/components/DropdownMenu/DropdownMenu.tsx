import React, { useState, useRef, useEffect } from "react";
import { useNavigate }                        from "react-router-dom";
import "./DropdownMenu.css";

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef         = useRef<HTMLDivElement>(null);
  const navigate            = useNavigate();

  const toggleDropdown = () => setIsOpen(open => !open);

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="dropdown-toggle">
        Menu ▼
      </button>

      {isOpen && (
        <ul className="dropdown-menu">
          <li
            className="dropdown-item"
            onClick={() => {
              navigate("/dashboard");
              setIsOpen(false);
            }}
          >
            Dashboard
          </li>
          <li
            className="dropdown-item"
            onClick={() => {
              navigate("/settings");
              setIsOpen(false);
            }}
          >
            Settings
          </li>
          <li
            className="dropdown-item"
            onClick={() => {
              navigate("/profile");
              setIsOpen(false);
            }}
          >
            Profile
          </li>
          <li
            className="dropdown-item"
            onClick={() => {
              navigate("/notes");
              setIsOpen(false);
            }}
          >
            Notes
          </li>
          <li
            className="dropdown-item"
            onClick={() => {
              navigate("/signin");
              setIsOpen(false);
            }}
          >
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
