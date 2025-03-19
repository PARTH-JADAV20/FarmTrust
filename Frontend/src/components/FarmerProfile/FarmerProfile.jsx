import React from 'react';
import './FarmerProfile.css';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { MdVerifiedUser } from "react-icons/md";
import { FiMessageCircle } from 'react-icons/fi';
import { IoStar, IoLeaf } from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';
import { FaFlag } from "react-icons/fa6";

import ProfileImage from '../../assets/profile-image.jpg';
import SarahImage from '../../assets/priya-singh.jpg'; // Review profile images
import MichaelImage from '../../assets/amit-patel.jpg'; // Review profile images
import TomatoesImage from '../../assets/tomatoes.jpg'; // Product images
import CarrotsImage from '../../assets/carrots.jpg'; // Product images
import SpinachImage from '../../assets/spinach.jpg'; // Product images
import PotatoesImage from '../../assets/potatoes.jpg'; // Product images

const FarmerProfile = () => {
  return (
    <div className="farmer-profile-container">
      
      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-card">
          <div className="profile-header">
            <img src={ProfileImage} alt="Farmer" className="profile-image" />
            <div className="profile-info">
              <h2>Rajesh Kumar <span className="verified"><MdVerifiedUser /> </span></h2>
              <p className="trusted-by"><MdVerifiedUser /> Trusted by FarmTrust</p>
              <p className="contact-info"><FaEnvelope /> rajesh.kumar@farmtrust.com</p>
              <p className="contact-info"><FaPhoneAlt /> +91 98765 43210</p>
              <p className="contact-info"><FaLocationDot /> Nashik, Maharashtra</p>
              <div className="contact-buttons">
                <button className="message-btn"><FiMessageCircle /> Message</button>
                <button className="call-btn"><FaPhoneAlt /> Call</button>
              </div>
            </div>
            <button className="report-btn"><FaFlag /> Report Seller</button>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="certifications-section">
        <div className="certifications-card">
          <h3>Certifications</h3>
          <div className="certification-items">
            <div className="certification-item">
              <div className="cert-icon"><IoStar /></div>
              <p>FSSAI Certified <br /> Valid until Dec 2025</p>
              <a href="#" className="view-certificate-link">View Certificate</a>
            </div>
            <div className="certification-item">
              <div className="cert-icon"><IoLeaf /></div>
              <p>Organic Certification <br /> Valid until Nov 2025</p>
              <a href="#" className="view-certificate-link">View Certificate</a>
            </div>
          </div>
        </div>
      </div>

      {/* About Farmer Section */}
      <div className="about-farmer-section">
        <div className="about-farmer-card">
          <h3>About the Farmer</h3>
          <p>
            With over 15 years of experience in natural farming, I specialize in growing organic vegetables and fruits using traditional farming methods. Our farm follows sustainable practices, avoiding chemical pesticides and fertilizers. We take pride in delivering fresh, healthy produce directly from our fields to your table.
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <div className="reviews-card">
          <div className="reviews-header">
            <h3>Reviews</h3>
            <div className="rating">
              <span className="stars">★★★★☆</span> 4.2 (128 reviews)
            </div>
          </div>
          <div className="review-items">
            <div className="review-item">
              <img src={SarahImage} alt="Sarah Johnson" className="review-profile-pic" />
              <div className="review-content">
                <div className="review-header">
                  <span className="reviewer-name">Sarah Johnson</span>
                  <span className="review-date">2 days ago</span>
                </div>
                <div className="review-rating">★★★★★</div>
                <p className="review-text">
                  The vegetables are always fresh and the service is excellent. Really appreciate the sustainable farming practices!
                </p>
              </div>
            </div>
            <div className="review-item">
              <img src={MichaelImage} alt="Michael Chen" className="review-profile-pic" />
              <div className="review-content">
                <div className="review-header">
                  <span className="reviewer-name">Michael Chen</span>
                  <span className="review-date">1 week ago</span>
                </div>
                <div className="review-rating">★★★★☆</div>
                <p className="review-text">
                  Quality products and reliable delivery. The organic certification gives me confidence in the produce.
                </p>
              </div>
            </div>
          </div>
          <div className="view-all-reviews">
            <a href="#" className="view-all-link">View All Reviews →</a>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="products-section-d">
        <div className="products-card-d">
          <div className="products-header-d">
            <h3>Products</h3>
            <a href="#" className="view-all-link">View All</a>
          </div>
          <div className="products-grid-d">
            <div className="product-item-d">
              <img src={TomatoesImage} alt="Organic Tomatoes" className="product-image-d" />
              <p className="product-name-d">Organic Tomatoes</p>
              <div className='products123-d'>
                <p className="product-price-d">₹4.99/Kg</p>
                <a href="#" className="view-product-btn-d">Add to Cart</a>
              </div>
            </div>
            <div className="product-item-d">
              <img src={CarrotsImage} alt="Organic Carrots" className="product-image-d" />
              <p className="product-name-d">Organic Carrots</p>
              <div className='products123-d'>
                <p className="product-price-d">₹5.99/Kg</p>
                <a href="#" className="view-product-btn-d">Add to Cart</a>
              </div>
            </div>
            <div className="product-item-d">
              <img src={SpinachImage} alt="Organic Spinach" className="product-image-d" />
              <p className="product-name-d">Organic Spinach</p>
              <div className='products123-d'>
                <p className="product-price-d">₹7.99/Kg</p>
                <a href="#" className="view-product-btn-d">Add to Cart</a>
              </div>
            </div>
            <div className="product-item-d">
              <img src={PotatoesImage} alt="Organic Potatoes" className="product-image-d" />
              <p className="product-name-d">Organic Potatoes</p>
              <div className='products123-d'>
                <p className="product-price-d">₹8.99/Kg</p>
                <a href="#" className="view-product-btn-d">Add to Cart</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;