// import React, { useState , useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from '../components/Dashboard/Dashboard';
// import Sidebar from './Sidebar/Sidebar';
// import { FaBars, FaSeedling } from 'react-icons/fa';
// import '../components/Dashboard/Dashboard.css';
// import ProfileFarmer from './ProfileFarmer/ProfileFarmer';
// import FarmerProducts from './FarmerProducts/FarmerProducts';
// import FarmerChat from './FarmerChat/FarmerChat';
// import FarmerOrders from './FarmerOrders/FarmerOrders';
// // import { useAuth0 } from "@auth0/auth0-react";
// import { getUserByEmail } from '../components/Api'

// const Farmer = () => {
//   // const [userRole, setUserRole] = useState(null);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { user , isAuthenticated } = useAuth0();
//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

  
//   // useEffect(() => {
//   //   const fetchUserRole = async () => {
//   //     if (!isAuthenticated || !user?.email) return;
//   //     setLoading(true);
//   //     try {
//   //       const data = await getUserByEmail(user.email);
//   //       setUserRole(data.user.role);
//   //     } catch (err) {
//   //       setError(err);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
//   //   fetchUserRole();
//   // }, [isAuthenticated, user?.email]);



//   // const currentUserEmail = "priy.mavani.01@gmail.com";
//   // const userType = "customer"
//   return (
//     <div className="da-dashboard-container">
//       {/* Mobile Menu Button */}
//       <div className="da-mobile-menu-button" onClick={toggleSidebar}>
//         <FaBars />
//       </div>
      
//       {/* Logo for Mobile */}
//       <div className="da-mobile-logo">
//         <span className="da-logo-icon"><FaSeedling /></span>
//         <h2 className="da-logo-text">FarmTrust</h2>
//       </div>

//       {/* Sidebar Component */}
//       <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
//       {/* Main Content */}
//       <div className="da-main-content">
//         <Routes>
//           <Route path="/" element={<Navigate to="/farmer/dashboard" replace />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/profile" element={<ProfileFarmer />} />
//           <Route path="/products" element={<FarmerProducts />} />
//           {/* <Route path="/messages" element={<FarmerChat currentUserEmail={currentUserEmail} userType={userType}/>} /> */}
//           <Route path="/messages" element={<FarmerChat />} />
//           <Route path="/orders" element={<FarmerOrders/>} />
//           {/* Add more routes here as needed */}
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default Farmer;

// components/Farmer.jsx
import React, { useState, useEffect } from 'react';
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
          <Route path="/" element={<Navigate to="/farmerpanel/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfileFarmer />} />
          <Route path="/products" element={<FarmerProducts />} />
          <Route path="/messages" element={<FarmerChat />} />
          <Route path="/orders" element={<FarmerOrders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Farmer;