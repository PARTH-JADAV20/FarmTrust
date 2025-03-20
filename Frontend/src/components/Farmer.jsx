import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import Sidebar from './Sidebar/Sidebar';
import { FaBars, FaSeedling } from 'react-icons/fa';
import '../components/Dashboard/Dashboard.css';
import ProfileFarmer from './ProfileFarmer/ProfileFarmer';
import FarmerProducts from './FarmerProducts/FarmerProducts';

const Farmer = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="da-dashboard-container">
      {/* Mobile Menu Button */}
      <div className="da-mobile-menu-button" onClick={toggleSidebar}>
        <FaBars />
      </div>
      
      {/* Logo for Mobile */}
      <div className="da-mobile-logo">
        <span className="da-logo-icon"><FaSeedling /></span>
        <h2 className="da-logo-text">FarmTrust</h2>
      </div>

      {/* Sidebar Component */}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className="da-main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/farmer/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfileFarmer />} />
          <Route path="/products" element={<FarmerProducts />} />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </div>
  );
};

export default Farmer;