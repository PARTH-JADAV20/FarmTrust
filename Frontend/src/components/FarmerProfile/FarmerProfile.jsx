import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './FarmerProfile.css';
import { FaEnvelope, FaPhoneAlt, FaFlag, FaPhoneSlash } from 'react-icons/fa';
import { MdVerifiedUser } from 'react-icons/md';
import { FiMessageCircle } from 'react-icons/fi';
import { IoStar, IoLeaf } from 'react-icons/io5';
import { FaLocationDot } from 'react-icons/fa6';
import { getFarmerByEmail } from '../Api';
import { Link } from 'react-router-dom';

const FarmerProfile = () => {
  const { email } = useParams();
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFarmer = async () => {
      try {
        const data = await getFarmerByEmail(email);
        setFarmer(data.farmer);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchFarmer();
  }, [email]);

  if (loading) return <div>Loading farmer profile...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!farmer) return <div>No farmer found</div>;

  // Mask phone number if showPhoneToUsers is false
  const displayPhone = farmer.showPhoneToUsers
    ? farmer.phone
    : `******${farmer.phone.slice(-4)}`;

  return (
    <div className="farmer-profile-container">
      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-card">
          <div className="profile-header">
            <img src={farmer.profilePic} alt={farmer.name} className="profile-image" />
            <div className="profile-info">
              <h2>
                {farmer.name} {farmer.isVerified && <span className="verified"><MdVerifiedUser /></span>}
              </h2>
              <p className="trusted-by">
                <MdVerifiedUser /> Trusted by FarmTrust
              </p>
              <p className="contact-info">
                <FaEnvelope /> {farmer.email}
              </p>
              <p className="contact-info">
                <FaPhoneAlt /> {displayPhone}
              </p>
              <p className="contact-info">
                <FaLocationDot /> {farmer.address.city}, {farmer.address.state}
              </p>
              <div className="contact-buttons">
                <button className="message-btn">
                  <FiMessageCircle /> Message
                </button>
                <button
                  className="call-btn"
                  disabled={!farmer.showPhoneToUsers}
                >
                  {farmer.showPhoneToUsers ? (
                    <><FaPhoneAlt /> Call</>
                  ) : (
                    <><FaPhoneSlash /> Call</>
                  )}
                </button>
              </div>
            </div>
            <button className="report-btn">
              <FaFlag /> Report Seller
            </button>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="certifications-section">
        <div className="certifications-card">
          <h3>Certifications</h3>
          <div className="certification-items">
            {farmer.certificates.fssai && (
              <div className="certification-item">
                <div className="cert-icon"><IoStar /></div>
                <p>FSSAI Certified <br /> Valid until Dec 2025</p>
                <a href={farmer.certificates.fssai} target="_blank" rel="noopener noreferrer" className="view-certificate-link">
                  View Certificate
                </a>
              </div>
            )}
            {farmer.certificates.organicFarm && (
              <div className="certification-item">
                <div className="cert-icon"><IoLeaf /></div>
                <p>Organic Certification <br /> Valid until Nov 2025</p>
                <a href={farmer.certificates.organicFarm} target="_blank" rel="noopener noreferrer" className="view-certificate-link">
                  View Certificate
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* About Farmer Section */}
      <div className="about-farmer-section">
        <div className="about-farmer-card">
          <h3>About the Farmer</h3>
          <p>{farmer.description || 'No description available.'}</p>
        </div>
      </div>

      {/* Reviews Section (Static for now) */}
      <div className="reviews-section">
        <div className="reviews-card">
          <div className="reviews-header">
            <h3>Reviews</h3>
            <div className="rating">
              <span className="stars">★★★★☆</span> {farmer.farmerRating || 'N/A'} ({farmer.products.length + 2} reviews)
            </div>
          </div>
          <div className="review-items">
            <div className="review-item">
              <img src="https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg" alt="Reviewer" className="review-profile-pic" />
              <div className="review-content">
                <div className="review-header">
                  <span className="reviewer-name">Sarah Johnson</span>
                  <span className="review-date">2 days ago</span>
                </div>
                <div className="review-rating">★★★★★</div>
                <p className="review-text">
                  The vegetables are always fresh and the service is excellent.
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
            {farmer.products.map((product) => (
              <div key={product.id} className="product-item-d">
                <Link to={`/products/${product.id}`}>
                  <img src={product.images[0]} alt={product.name} className="product-image-d" />
                </Link>
                <p className="product-name-d">{product.name}</p>
                <div className="products123-d">
                  <p className="product-price-d">₹{product.mrpPerKg}/Kg</p>
                  <a href={`/products/${product.id}`} className="view-product-btn-d">
                    Add to Cart
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;