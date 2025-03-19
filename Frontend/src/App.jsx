import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FarmerProfile from './components/FarmerProfile/FarmerProfile';
import Footer from './components/Footer';
import ProductList from './components/Product/ProductList';
import SingleProduct from './components/SingleProduct/SIngleProduct';
import FarmerApplyForm from './components/FarmerApplyForm/FarmerApplyForm';
import LandingPage from './components/LandingPage/LandingPage';
import UserPrfoile from './components/UserProfile/UserProfile';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path='/product' element={<SingleProduct />} />
        <Route path='/farmer-application' element={<FarmerApplyForm />} />
        <Route path="/farmer" element={<FarmerProfile />} />
        <Route path="/user" element={<UserPrfoile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
