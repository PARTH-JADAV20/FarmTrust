import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import Sidebar from './Sidebar/Sidebar';
import { FaBars, FaSeedling } from 'react-icons/fa';
import '../components/Dashboard/Dashboard.css';
import ProfileFarmer from './ProfileFarmer/ProfileFarmer';
import FarmerProducts from './FarmerProducts/FarmerProducts';
import FarmerChat from './FarmerChat/FarmerChat';
import FarmerOrders from './FarmerOrders/FarmerOrders';

const Farmer = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const currentUserEmail = "priy.mavani.01@gmail.com";
  const userType = "customer"
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
          <Route path="/messages" element={<FarmerChat currentUserEmail={currentUserEmail} userType={userType}/>} />
          <Route path="/orders" element={<FarmerOrders/>} />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </div>
  );
};

export default Farmer;