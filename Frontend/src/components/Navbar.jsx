// Navbar.js
import React from 'react';
import './Navbar.css'; // Import the external CSS
import { FaSearch, FaBell, FaEnvelope } from 'react-icons/fa'; // Importing icons from react-icons

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>FarmTrust</h1>
      </div>
      <div className="navbar-right">
        <div className="search-section">
          <FaSearch className="icon" />
          <input type="text" placeholder="Search products..." />
        </div>
        <div className="icon-section">
          <FaBell className="icon" />
          <FaEnvelope className="icon" />
        </div>
        <button className="sign-in-btn">Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;