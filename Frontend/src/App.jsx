import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import FarmerProfile from './components/FarmerProfile/FarmerProfile';
import Footer from './components/Footer';
import ProductList from './components/Product/ProductList';
import SingleProduct from './components/SingleProduct/SIngleProduct';
import FarmerApplyForm from './components/FarmerApplyForm/FarmerApplyForm';
import LandingPage from './components/LandingPage/LandingPage';
import UserPrfoile from './components/UserProfile/UserProfile';
import Farmer from './components/Farmer';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isFarmerDashboard = location.pathname.startsWith("/farmer");
  
  return (
    <>
      {!isFarmerDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path='/product' element={<SingleProduct />} />
        <Route path='/farmer-application' element={<FarmerApplyForm />} />
        <Route path="/farmer" element={<FarmerProfile />} />
        <Route path="/user" element={<UserPrfoile />} />
        <Route path="/farmer/*" element={<Farmer />} />
      </Routes>
        <Footer />
    </>
  );
}

export default App;