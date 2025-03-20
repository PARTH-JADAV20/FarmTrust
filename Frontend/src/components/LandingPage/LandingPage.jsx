import React from 'react';
import './LandingPage.css';
import farmersImage from '../../assets/farmers.jpg'; // Banner image
import organicVegetables from '../../assets/organic-vegetables.jpg'; // Product image 1
import freshFruits from '../../assets/fresh-fruits.jpg'; // Product image 2
import pureHoney from '../../assets/pure-honey.jpg'; // Product image 3
import organicGrains from '../../assets/organic-grains.jpg'; // Product image 4
import rajeshKumar from '../../assets/rajesh-kumar.jpg'; // Farmer image 1 (used for testimonial 1)
import priyaSingh from '../../assets/priya-singh.jpg'; // Farmer image 2 (used for testimonial 2)
import amitPatel from '../../assets/amit-patel.jpg'; // Farmer image 3 (used for testimonial 3)
import { FaUserPlus, FaCheck, FaStore, FaSearch, FaShoppingCart, FaCertificate, FaStar } from 'react-icons/fa'; // Import required icons
import { IoDocumentTextOutline } from "react-icons/io5"
import { MdVerifiedUser } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const { isAuthenticated, loginWithPopup } = useAuth0();
  const navigate = useNavigate();
  const handleApplyForFarmer = async () => {
    if (isAuthenticated) {
      navigate('/farmer-application');
    } else {
      try {
        await loginWithPopup();
        if (isAuthenticated) {
          console.log('Login succeeded, navigating to /farmer-application');
          navigate('/farmer-application');
        }
      } catch (error) {
        console.error('Login failed or cancelled:', error);
        return;
      }
    }

  };
  // Function to render stars based on rating and total
  const renderStars = (rating, total = 5) => {
    const stars = [];
    for (let i = 1; i <= total; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= rating ? 'star-icon filled' : 'star-icon empty'}
        />
      );
    }
    return (
      <div className="stars">
        {stars}
        <span className="review-count">{rating}/{total}</span>
      </div>
    );}
  

  

  return (
    <div className="landing-page">
      <div className="banner-section">
        <div className="farmer-banner">
          <div className="banner-content">
            <h1 className="banner-title">
              Empowering Farmers, <span>Ensuring Authenticity</span>
            </h1>
            <p className="banner-description">
              A transparent marketplace connecting consumers with verified natural farmers.
            </p>
            <div>
              <button
                className="explore-button"
                style={{ backgroundColor: 'black', marginRight: '10px' }}
                onClick={handleApplyForFarmer}
              >
                Apply for Farmer
              </button>
              <button className="explore-button">Explore Products</button>
            </div>
          </div>
          <div className="banner-image">
            <img src={farmersImage} alt="Farmers Illustration" />
          </div>
        </div>
      </div>
      {/* Content Section with White Background */}
      <div className="content">
        {/* Why Choose Us Section */}
        <div className="why-choose-us">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="features">
            <div className="feature-item">
              <MdVerifiedUser className="feature-icon" />
              <h3 className="feature-title">Verified Farmers</h3>
              <p className="feature-description">
                Trust & authenticity guaranteed through our rigorous verification process.
              </p>
            </div>
            <div className="feature-item">
              <FaStore className="feature-icon" />
              <h3 className="feature-title">Direct Market</h3>
              <p className="feature-description">
                No middlemen ensuring fair pricing for both farmers and consumers.
              </p>
            </div>
            <div className="feature-item">
              <FaCertificate className="feature-icon" />
              <h3 className="feature-title">Certified Farmers</h3>
              <p className="feature-description">
                FSSAI, Organic, and other certifications verified.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="featured-products">
          <h2 className="section-title">Featured Products</h2>
          <div className="products">
            <div className="product-card">
              <Link to='/products'>
                <img src={organicVegetables} alt="Organic Vegetables" className="product-image" />
                <h3 className="product-title">Organic Vegetables</h3>
                <p className="product-price">₹199/kg</p>
                <button className="view-details-button" >View Details</button>
              </Link>
            </div>
            <div className="product-card">
              <Link to='/products'>
                <img src={freshFruits} alt="Fresh Fruits" className="product-image" />
                <h3 className="product-title">Fresh Fruits</h3>
                <p className="product-price">₹149/kg</p>
                <button className="view-details-button">View Details</button>
              </Link>
            </div>
            <div className="product-card">
              <Link to='/products'>
                <img src={pureHoney} alt="Pure Honey" className="product-image" />
                <h3 className="product-title">Pure Honey</h3>
                <p className="product-price">₹399/500g</p>
                <button className="view-details-button">View Details</button>
              </Link>
            </div>
            <div className="product-card">
              <Link to='/products'>
                <img src={organicGrains} alt="Organic Grains" className="product-image" />
                <h3 className="product-title">Organic Grains</h3>
                <p className="product-price">₹299/kg</p>
                <button className="view-details-button">View Details</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Recommended Farmers Section */}
        <div className="recommended-farmers">
          <h2 className="section-title">Recommended Farmers</h2>
          <div className="farmers">
            <div className="farmer-card">
              <img src={rajeshKumar} alt="Rajesh Kumar" className="farmer-image" />
              <div className="farmer-info">
                <h3 className="farmer-name">Rajesh Kumar</h3>
                <p className="farmer-type">Organic Farming</p>
                {renderStars(4)} {/* Example rating of 4 out of 5 */}
              </div>
              <MdVerifiedUser className="verified-icon" />
            </div>
            <div className="farmer-card">
              <img src={priyaSingh} alt="Priya Singh" className="farmer-image" />
              <div className="farmer-info">
                <h3 className="farmer-name">Priya Singh</h3>
                <p className="farmer-type">Natural Farming</p>
                {renderStars(3)} {/* Example rating of 3 out of 5 */}
              </div>
              <MdVerifiedUser className="verified-icon" />
            </div>
            <div className="farmer-card">
              <img src={amitPatel} alt="Amit Patel" className="farmer-image" />
              <div className="farmer-info">
                <h3 className="farmer-name">Amit Patel</h3>
                <p className="farmer-type">Sustainable Farming</p>
                {renderStars(5)} {/* Example rating of 5 out of 5 */}
              </div>
              <MdVerifiedUser className="verified-icon" />
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="how-it-works">
          <h2 className="section-title">How It Works</h2>
          <div className="works-container">
            <div className="works-column">
              <h3 className="column-title">For Farmers</h3>
              <div className="works-step">
                <FaUserPlus className="step-icon" />
                <div className="step-line"></div>
                <FaCheck className="step-icon" />
                <div className="step-line"></div>
                <FaStore className="step-icon" />
              </div>
              <p className="works-description">Register → Get Verified → List Products</p>
            </div>
            <div className="works-column">
              <h3 className="column-title">For Consumers</h3>
              <div className="works-step">
                <FaSearch className="step-icon" />
                <div className="step-line"></div>
                <IoDocumentTextOutline className="step-icon" />
                <div className="step-line"></div>
                <FaShoppingCart className="step-icon" />
              </div>
              <p className="works-description">Browse → Verify Seller → Buy</p>
            </div>
          </div>
        </div>

        {/* Customer Testimonials Section */}
        <div className="testimonials">
          <h2 className="section-title">Customer Testimonials</h2>
          <div className="testimonials-container">
            <div className="testimonial-card">
              {renderStars(4)} {/* Example rating of 4 out of 5 */}
              <p className="testimonial-text">
                "Amazing quality products directly from farmers. The transparency in the system is commendable."
              </p>
              <div className="customer-info">
                <img src={rajeshKumar} alt="Sarah Johnson" className="customer-image" />
                <div className="customer-details">
                  <h3 className="customer-name">Sarah Johnson</h3>
                  <p className="customer-role">Regular Customer</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              {renderStars(3.5)} {/* Example rating of 3.5 out of 5 */}
              <p className="testimonial-text">
                "The verification process gives me confidence in the authenticity of the products."
              </p>
              <div className="customer-info">
                <img src={priyaSingh} alt="Michael Chen" className="customer-image" />
                <div className="customer-details">
                  <h3 className="customer-name">Michael Chen</h3>
                  <p className="customer-role">Verified Buyer</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              {renderStars(5)} 
              <p className="testimonial-text">
                "Fresh products and excellent customer service. Will definitely recommend!"
              </p>
              <div className="customer-info">
                <img src={amitPatel} alt="Emma Wilson" className="customer-image" />
                <div className="customer-details">
                  <h3 className="customer-name">Emma Wilson</h3>
                  <p className="customer-role">Happy Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Join Our Growing Community Section */}
        <div className="community-section">
          <h2 className="community-title">Join Our Growing Community</h2>
          <div className="community-buttons">
            <button className="community-button">Join Us</button>
          </div>
        </div>
      </div>
      {/* Footer Section */}
      
    </div>
  );
};

export default LandingPage;