import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import FarmerProfile from './components/FarmerProfile/FarmerProfile';
import Footer from './components/Footer';
import ProductList from './components/Product/ProductList';
import SingleProduct from './components/SingleProduct/SIngleProduct';
import FarmerApplyForm from './components/FarmerApplyForm/FarmerApplyForm';
import LandingPage from './components/LandingPage/LandingPage';
import UserDashboard from './components/UserDashboard';
import Farmer from './components/Farmer';
import UserOrders from './components/UserOrders/UserOrders';
import UserCart from './components/UserCart/UserCart';
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isFarmerDashboard = location.pathname.startsWith("/farmerpanel");
  
  return (
    <>
      {!isFarmerDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route path='/farmer-application' element={<FarmerApplyForm />} />
        <Route path="/farmer/:email" element={<FarmerProfile />} />
        <Route path="/user/*" element={<UserDashboard />} />
        <Route path="/farmerpanel/*" element={<Farmer />} />
      </Routes>
        <Footer />
    </>
  );
}

export default App;