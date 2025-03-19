import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { FaHome, FaBox, FaShoppingCart, FaComments, FaChartBar, FaUser, FaMedal, FaCog, FaTimes } from 'react-icons/fa';
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaLeaf } from "react-icons/fa6";
import { Link, useLocation } from 'react-router-dom';
import { RiDashboardFill } from "react-icons/ri";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState('/farmer/dashboard');
  
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  return (
    <>
      <div className={`da-sidebar ${sidebarOpen ? 'da-sidebar-open' : ''}`}>
        <div className="da-logo-container navbar-logo">
          <span className="da-logo-icon"> <FaLeaf className='leaf-logo'/></span>
          <h2 className="da-logo-text">FarmTrust</h2>
          <div className="da-close-sidebar" onClick={toggleSidebar}>
            <FaTimes />
          </div>
        </div>
        
        <nav className="da-sidebar-nav">
          <Link to='/'>
            <div className="da-nav-item" onClick={toggleSidebar}>
              <span className="da-nav-icon"><IoMdArrowRoundBack /></span>
              <span className="da-nav-text"> Home </span>
            </div>
          </Link>

          <Link to='/farmer/dashboard'>
          <div className={`da-nav-item ${activePath === '/farmer/dashboard' ? 'da-active' : ''}`} onClick={toggleSidebar}>
            <span className="da-nav-icon"><RiDashboardFill /></span>
            <span className="da-nav-text">Dashboard</span>
          </div>
          </Link>

          <Link to='/farmer/profile'>
          <div className={`da-nav-item ${activePath === '/farmer/profile' ? 'da-active' : ''}`} onClick={toggleSidebar}>
            <span className="da-nav-icon"><FaUser /></span>
            <span className="da-nav-text">Profile</span>
          </div>
          </Link>
          
          <Link to='/farmer/products'>
          <div className={`da-nav-item ${activePath === '/farmer/products' ? 'da-active' : ''}`} onClick={toggleSidebar}>
            <span className="da-nav-icon"><FaBox /></span>
            <span className="da-nav-text">My Products</span>
          </div>
          </Link>
          
          <Link to='/farmer/orders'>
          <div className={`da-nav-item ${activePath === '/farmer/orders' ? 'da-active' : ''}`} onClick={toggleSidebar}>
            <span className="da-nav-icon"><FaShoppingCart /></span>
            <span className="da-nav-text">Orders</span>
          </div>
          </Link>
          
          <Link to='/farmer/messages'>
          <div className={`da-nav-item ${activePath === '/farmer/messages' ? 'da-active' : ''}`} onClick={toggleSidebar}>
            <span className="da-nav-icon"><FaComments /></span>
            <span className="da-nav-text">Messages</span>
          </div>
          </Link>
          
          <Link to='/farmer/analytics'>
          <div className={`da-nav-item ${activePath === '/farmer/analytics' ? 'da-active' : ''}`} onClick={toggleSidebar}>
            <span className="da-nav-icon"><FaChartBar /></span>
            <span className="da-nav-text">Analytics</span>
          </div>
          </Link>
          
        </nav>
      </div>
      
      {sidebarOpen && <div className="da-sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;