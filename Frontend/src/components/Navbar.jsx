import React from 'react';
import './Navbar.css'; // Import the external CSS
import { FaSearch, FaBell, FaEnvelope } from 'react-icons/fa'; // Importing icons from react-icons
import { FaLeaf } from "react-icons/fa6";
import { useAuth0 } from "@auth0/auth0-react";


const Navbar = () => {
  const { loginWithPopup, user, isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <FaLeaf className='leaf-logo' />
        <h1>FarmTrust</h1>
      </div>
      <div className="navbar-right">
        <div className="search-section">
          <FaSearch className="icon" />
          <input type="text" placeholder="Search products..." />
        </div>
        <div className="icon-section">
          <FaBell className="icon" />
          <FaEnvelope className="icon" onClick={() => logout({ returnTo: '/' })}/>
        </div>
        
          {isAuthenticated ? (
            <div style={{ cursor: "pointer" }}>
                <img
                  src={user?.picture || "https://www.svgrepo.com/download/192247/man-user.svg"}
                  alt="Profile"
                  className='profile-pic'
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                  onError={(e) => {
                    e.target.src = "https://www.svgrepo.com/download/192247/man-user.svg";
                  }}
                />
            </div>
          ) : (
            <div
              id="signin"
              onClick={async () => {
                try {
                  await loginWithPopup();
                  await getAccessTokenSilently();
                } catch (error) {
                  console.error("Login failed:", error);
                }
              }}
              style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <button className="sign-in-btn">Sign In</button>
            </div>
          )}
        

      </div>
    </nav>
  );
};

export default Navbar;