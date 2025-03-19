

import React, { useState } from 'react';
import './SingleProduct.css';
import ta1 from '../../assets/tomato1.png';
import ta2 from '../../assets/tomato2.png';
import ta3 from '../../assets/tomato3.png';
import ta4 from '../../assets/tomato4.png';
import ta5 from '../../assets/tomato5.png';
import rajesh from '../../assets/rajesh.jpg';
import riya from '../../assets/priya-singh.jpg';
import potato from '../../assets/potato.jpg';
import { FaFlag } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [rating, setRating] = useState(0);
  
  // Product images
  const mainImage = ta1 ;
  const thumbnails = [
    ta2,
    ta3,
    ta4,
    ta5,
    
  ];
  
  // Related products
  const relatedProducts = [
    {
      id: 1,
      name: 'Organic Potatoes',
      price: '₹289/kg',
      image: potato
    }
  ];
  
  // Reviews
  const reviews = [
    {
      id: 1,
      name: 'Riya Sharma',
      rating: 5,
      comment: 'Excellent quality tomatoes! Very fresh and tasty. Will definitely buy again.'
    }
  ];
  
  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };
  
  const handleRatingClick = (value) => {
    setRating(value);
  };

  return (
    <div className="product-page-container">
      <div className="product-main-section">
        <div className="product-image-section">
          <div className="main-image-container">
            <img src={mainImage} alt="Organic Farm-Fresh Tomatoes" className="main-image" />
          </div>
          <div className="thumbnails-container">
            {thumbnails.map((thumb, index) => (
              <div 
                key={index} 
                className={`thumbnail ${selectedImage === index ? 'active-thumbnail' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img src={thumb} alt={`Tomato thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="product-info-section">
          <h1 className="product-title">Organic Farm-Fresh Tomatoes</h1>
          <p className="product-description">
            Premium-quality, locally grown organic tomatoes. Harvested daily for maximum freshness and taste.
          </p>
          
          <div className="product-price">₹499/kg</div>
          
          <div className="farmer-d">
          {/* <div className="farmer-card"> */}
<div className="farmer-info">
<div className="farmer-avatar">
  <img src={rajesh} alt="Rajesh Kumar" />
</div>
<div className="farmer-details">
  <div className="farmer-name">
    <h3>Rajesh Kumar</h3>
    <span className="verified-badge">✓</span>
  </div>
  <p className="farmer-trust">Trusted by FarmTrust</p>
  <a href="#" className="view-profile">View Profile</a>
</div>
</div>
<div className="farmer-actions">
<a href="#" className="view-certificate"> <span className="file-icon-fa"> <FaFileAlt /> </span>View Certificate</a>
<button className="report-seller">
  <span className="report-icon"><FaFlag /></span>
  Report Seller
</button>
</div>
{/* </div> */}
</div>
          
          <div className="product-actions">
            <button className="buy-now-button">Buy Now</button>
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
        </div>
      </div>
      
      <div className="related-products-section">
        <h2 className="section-title">Related Products</h2>
        <div className="related-products-container">
          {relatedProducts.map(product => (
            <div key={product.id} className="related-product-card">
              <div className="related-product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="related-product-info">
                <h3 className="related-product-name">{product.name}</h3>
                <div className="related-product-price">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="customer-reviews-section">
        <h2 className="section-title">Customer Reviews</h2>
        
        <div className="write-review-container">
          <div className="write-review-header">Write a Review</div>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map(star => (
              <span 
                key={star} 
                className={`star ${rating >= star ? 'filled' : ''}`}
                onClick={() => handleRatingClick(star)}
              >
                ★
              </span>
            ))}
          </div>
          <textarea 
            className="review-input" 
            placeholder="Share your experience..."
          ></textarea>
          <button className="submit-review-button">Submit Review</button>
        </div>
        
        <div className="reviews-list">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="reviewer-avatar">
                <img src={riya} alt={review.name} />
              </div>
              <div className="review-content">
                <div className="reviewer-name">{review.name}</div>
                <div className="review-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</span>
                  ))}
                </div>
                <div className="review-text">{review.comment}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

