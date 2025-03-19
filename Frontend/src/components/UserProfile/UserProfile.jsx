import React from 'react';
import './UserProfile.css'; // Ensure this matches the CSS file name
import profilePic from '../../assets/priya-singh.jpg'; // Verify the path is correct
import { FaUser, FaShoppingBag, FaShoppingCart } from 'react-icons/fa'; // React Icons

const UserProfile = () => { 
  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile-pic-section">
          <img src={profilePic} alt="Profile" className="profile-pic" />
        </div>
        <ul className="sidebar-menu">
          <li className="active">
            <FaUser className="icon" /> Profile Information
          </li>
          <li>
            <FaShoppingBag className="icon" /> My Orders
          </li>
          <li>
            <FaShoppingCart className="icon" /> Cart
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>My Profile</h1>
        <p>Manage your account settings and preferences</p>

        {/* Personal Information */}
        <div className="section">
          <h2>Personal Information</h2>
          <div className="form-group">
            <div className="input-field">
              <input type="text" defaultValue="Sarah Anderson" placeholder="Full Name" />
            </div>
            <div className="input-field">
              <input type="email" defaultValue="sarah.anderson@example.com" placeholder="Email Address" disabled/>
            </div>
          </div>
          <div className="form-group">
            <div className="input-field">
              <input type="tel" defaultValue="+1 (555) 123-4567" placeholder="Phone Number" />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="section">
          <h2>Address</h2>
          <div className="form-group">
            <div className="input-field">
              <input type="text" defaultValue="123 Nature Valley Road" placeholder="Street Address" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-field">
              <input type="text" defaultValue="Green Hills" placeholder="City" />
            </div>
            <div className="input-field">
              <input type="text" defaultValue="California" placeholder="State" />
            </div>
          </div>
          <div className="form-group">
            <div className="input-field">
              <input type="text" defaultValue="94123" placeholder="Zipcode" />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button className="save-btn">Save Changes</button>
          <button className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 