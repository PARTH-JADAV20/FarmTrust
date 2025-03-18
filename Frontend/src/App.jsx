import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import Footer from './components/Footer';
import ProductList from './components/Product/ProductList';
import SingleProduct from './components/SingleProduct/SIngleProduct';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path='/product' element={<SingleProduct />} />
       
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
