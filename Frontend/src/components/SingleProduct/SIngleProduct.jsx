import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SingleProduct.css';
import { FaFlag, FaFileAlt } from 'react-icons/fa';
import { MdVerifiedUser } from "react-icons/md";
import { getProductById, getAllProducts } from '../Api';
import { Link } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";

const ProductPage = () => {
  const { productId } = useParams(); // Get productId from URL
  const [selectedImage, setSelectedImage] = useState(0);
  const [rating, setRating] = useState(0);
  const [product, setProduct] = useState(null); // Current product
  const [relatedProducts, setRelatedProducts] = useState([]); // Related products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [certificateUrl, setCertificateUrl] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Fetch product details and related products when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the current product
        const productData = await getProductById(productId);
        const currentProduct = productData.product;
        setProduct(currentProduct);

        // Fetch all products to find related ones
        const allProductsData = await getAllProducts();
        const allProducts = allProductsData.products.map((prod) => ({
          id: prod.id,
          name: prod.name,
          price: prod.mrpPerKg,
          image: prod.images[0],
          category: prod.category.charAt(0).toUpperCase() + prod.category.slice(1)
        }));

        // Filter related products: same category, exclude current product, limit to 5
        const related = allProducts
          .filter(
            (prod) =>
              prod.category === (currentProduct.category.charAt(0).toUpperCase() + currentProduct.category.slice(1)) &&
              prod.id !== currentProduct.id
          )
          .slice(0, 5); // Take first 5

        setRelatedProducts(related);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details or related products.');
        setLoading(false);
      }
    };

    if (productId) {
      fetchData();
    } else {
      setError('No product ID provided.');
      setLoading(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error || !product) {
    return <div>{error || 'Product not found.'}</div>;
  }

  const mainImage = product.images[selectedImage] || product.images[0];
  const thumbnails = product.images || [];

  // Static reviews (could be fetched separately if API provides)
  const reviews = [
    {
      id: 1,
      name: 'Riya Sharma',
      rating: 5,
      comment: 'Excellent quality! Very fresh and tasty. Will definitely buy again.'
    }
  ];

  const handleCertificateClick = (url) => {
    setCertificateUrl(url); // Set the URL to display in iframe
  };

  const closeIframe = () => {
    setCertificateUrl(null); // Clear URL to hide iframe
  };

  const productName = "Organic Farm-Fresh Tomatoes";
  const productPrice = 499; // Price per kg
  const deliveryCharge = 40; // Fixed delivery charge

  const openPopup = () => {
    setShowPopup(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
  };

  const closePopup = () => {
    setShowPopup(false);
    document.body.style.overflow = 'auto'; // Enable scrolling again
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  // Calculate total price based on quantity
  const calculateSubtotal = () => {
    return productPrice * quantity;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + deliveryCharge;
  };



  return (
    <div className="product-page-container">
      <div className="product-main-section">
        <div className="product-image-section">
          <div className="main-image-container">
            <img src={mainImage} alt={product.name} className="main-image" />
          </div>
          <div className="thumbnails-container">
            {thumbnails.map((thumb, index) => (
              <div
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active-thumbnail' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img src={thumb} alt={`${product.name} thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description || 'No description available.'}</p>

          <div className="product-price2">₹{product.mrpPerKg}/kg</div>

          <div className="farmer-d">
            <div className="farmer-info2">
              <div className="farmer-avatar2">
                <img src={product.farmer.profilePic} alt={product.farmer.name} />
              </div>
              <div className="farmer-details2">
                <div className="farmer-name2">
                  <h3>{product.farmer.name}</h3>
                  {product.farmer.isVerified && <MdVerifiedUser color='#28a745' />}
                </div>
                <p className="farmer-trust2">Trusted by FarmTrust</p>
                <Link to={`/farmer/${product.farmer.email}`} className="view-profile">
                  View Profile
                </Link>
              </div>
            </div>
            <div className="farmer-actions2">
              {product.farmer.certificates.fssai && (
                <button
                  onClick={() => handleCertificateClick(product.farmer.certificates.fssai)}
                  className="view-certificate"
                >
                  <span className="file-icon-fa"><FaFileAlt /></span>FSSAI Certificate
                </button>
              )}
              {product.farmer.certificates.organicFarm && (
                <button
                  onClick={() => handleCertificateClick(product.farmer.certificates.organicFarm)}
                  className="view-certificate"
                >
                  <span className="file-icon-fa"><FaFileAlt /></span>Organic Certificate
                </button>
              )}
              <button className="report-seller">
                <span className="report-icon"><FaFlag /></span>Report Seller
              </button>
            </div>
            {certificateUrl && (
              <div className="certificate-iframe-container">
                <button className="close-iframe" onClick={closeIframe}>Close</button>
                <iframe
                  src={certificateUrl}
                  title="Certificate"
                  className="certificate-iframe"
                />
              </div>
            )}
          </div>

          <div className="product-actions">
            <button className="buy-now-button" onClick={openPopup}>Buy Now</button>
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
        </div>
      </div>



      <div className="related-products-section">
        <h2 className="section-title">Related Products</h2>
        <div className="related-products-container">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((related) => (
              <div key={related.id} className="related-product-card">
                <Link to={`/products/${related.id}`}>
                  <div className="related-product-image">
                    <img src={related.image} alt={related.name} />
                  </div>
                </Link>
                <div className="related-product-info">
                  <h3 className="related-product-name">{related.name}</h3>
                  <div className="related-product-price">₹{related.price}/kg</div>
                </div>
              </div>
            ))
          ) : (
            <p>No related products available.</p>
          )}
        </div>
      </div>

      <div className="customer-reviews-section">
        <h2 className="section-title">Customer Reviews</h2>

        <div className="write-review-container">
          <div className="write-review-header">Write a Review</div>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? 'filled' : ''}`}
                onClick={() => handleRatingClick(star)}
              >
                ★
              </span>
            ))}
          </div>
          <textarea className="review-input" placeholder="Share your experience..."></textarea>
          <button className="submit-review-button">Submit Review</button>
        </div>

        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="reviewer-avatar">
                <img src="https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg" alt={review.name} />
              </div>
              <div className="review-content">
                <div className="reviewer-name">{review.name}</div>
                <div className="review-rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</span>
                  ))} <span style={{ color: "black" }}>3.5/5</span>
                </div>
                <div className="review-text">{review.comment}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buy Now Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <div className="popup-header">
              <h3>Complete Your Purchase</h3>
              <button className="close-popup" onClick={closePopup}>
                <FaTimes />
              </button>
            </div>
            <div className="popup-content1">
              <div className="popup-product-info">
                <img src={mainImage} alt={productName} className="popup-product-image" />
                <div className="popup-product-details">
                  <h4>{productName}</h4>
                  <p className="popup-product-price">₹{productPrice}/kg</p>
                </div>
              </div>

              <div className="quantity-selector">
                <h4>Select Quantity (kg)</h4>
                <div className="quantity-controls">
                  <button className="quantity-btn" onClick={decreaseQuantity} disabled={quantity <= 1}>
                    <FaMinus />
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button className="quantity-btn" onClick={increaseQuantity}>
                    <FaPlus />
                  </button>
                </div>
              </div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Price:</span>
                  <span>₹{calculateSubtotal()}</span>
                </div>
                <div className="price-row">
                  <span>Delivery charge:</span>
                  <span>₹{deliveryCharge}</span>
                </div>
                <div className="price-row total">
                  <span>Total Amount:</span>
                  <span>₹{calculateTotal()}</span>
                </div>
              </div>
            </div>
            <div className="popup-footer">
              <button className="cancel-btn" onClick={closePopup}>Cancel</button>
              <button className="confirm-btn">Confirm Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;