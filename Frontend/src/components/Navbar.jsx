import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaSearch, FaBell } from 'react-icons/fa';
import { FaLeaf } from "react-icons/fa6";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserByEmail } from './Api'
import { useNavigate } from 'react-router-dom';
import { IoMdChatbubbles } from "react-icons/io";


const Navbar = () => {
  const { loginWithPopup, user, isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!isAuthenticated || !user?.email) return;
      setLoading(true);
      try {
        const data = await getUserByEmail(user.email);
        setUserRole(data.user.role);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserRole();
  }, [isAuthenticated, user?.email]);


  const handleProfileClick = () => {
    if (userRole === 'farmer') {
      navigate('/farmerpanel/dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (userRole === 'customer') {
      navigate('/user');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      return;
    }
  };

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
          <FaBell className="icon" onClick={() => logout({ returnTo: '/' })} />
          <IoMdChatbubbles  className="icon" />
        </div>
        

        {isAuthenticated ? (
          <div style={{ cursor: "pointer" }} onClick={handleProfileClick}>
            <img
              src={user?.picture || "https://www.svgrepo.com/download/192247/man-user.svg"}
              alt="Profile"
              className="profile-pic"
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
}

export default Navbar;