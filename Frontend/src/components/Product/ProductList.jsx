import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import '../Product/ProductList.css';
import image from '../../assets/images/carrat.png';

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [maxPrice, setMaxPrice] = useState(1000); // Only max price slider

  const products = [
    {
      id: 1,
      name: 'Organic Carrots',
      price: 120,
      rating: 4,
      reviews: 24,
      image: image,
      category: 'Vegetables',
    },
    {
      id: 2,
      name: 'Fresh Apples',
      price: 180,
      rating: 5,
      reviews: 36,
      image: image,
      category: 'Fruits',
    },
    {
      id: 3,
      name: 'Brown Rice',
      price: 90,
      rating: 4,
      reviews: 18,
      image: image,
      category: 'Grains',
    },
    {
      id: 4,
      name: 'Organic Milk',
      price: 60,
      rating: 5,
      reviews: 42,
      image: image,
      category: 'Dairy',
    },
    {
      id: 5,
      name: 'Organic Carrots',
      price: 120,
      rating: 4,
      reviews: 24,
      image: image,
      category: 'Vegetables',
    },
    {
      id: 6,
      name: 'Fresh Apples',
      price: 180,
      rating: 5,
      reviews: 36,
      image: image,
      category: 'Fruits',
    },
    {
      id: 7,
      name: 'Brown Rice',
      price: 90,
      rating: 4,
      reviews: 18,
      image: image,
      category: 'Grains',
    },
    {
      id: 8,
      name: 'Organic Milk',
      price: 60,
      rating: 5,
      reviews: 42,
      image: image,
      category: 'Dairy',
    },
    // Add more products as needed
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(parseInt(e.target.value));
  };

  // Filter products by category and max price
  const filteredProducts = selectedCategory === 'All'
    ? products.filter(product => product.price <= maxPrice)
    : products.filter(product => product.category === selectedCategory && product.price <= maxPrice);

  // Sort products based on sortOrder
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === 'priceLowToHigh') {
      return a.price - b.price;
    } else if (sortOrder === 'priceHighToLow') {
      return b.price - a.price;
    } else {
      return b.id - a.id; // Newest first
    }
  });

  const RatingStars = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }
    return <div className="rating-stars">{stars}</div>;
  };

  const ProductCard = ({ product }) => {
    return (
      <div className="product-card2">
        <div className="product-image2">
          <img src={product.image} alt={product.name} />
        </div>
        <h3 className="product-name2">{product.name}</h3>
        <div className="product-rating2">
          <RatingStars rating={product.rating} />
          <span className="review-count2">({product.reviews} reviews)</span>
        </div>
        <div className="product-footer2">
          <div className="item-price">₹{product.price}/kg</div>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    );
  };

  return (
    <div className="Productlist-container">
      <div className="explore-section">
        <h1>Explore Natural Products</h1>
        <div className="categories">
          <button
            className={selectedCategory === 'All' ? 'active' : ''}
            onClick={() => handleCategoryChange('All')}
          >
            All
          </button>
          <button
            className={selectedCategory === 'Vegetables' ? 'active' : ''}
            onClick={() => handleCategoryChange('Vegetables')}
          >
            Vegetables
          </button>
          <button
            className={selectedCategory === 'Fruits' ? 'active' : ''}
            onClick={() => handleCategoryChange('Fruits')}
          >
            Fruits
          </button>
          <button
            className={selectedCategory === 'Grains' ? 'active' : ''}
            onClick={() => handleCategoryChange('Grains')}
          >
            Grains
          </button>
          <button
            className={selectedCategory === 'Dairy' ? 'active' : ''}
            onClick={() => handleCategoryChange('Dairy')}
          >
            Dairy
          </button>
        </div>
        <div className='price-sort'>
          <div className="price-range">
            <span className='price-span'>Price Range</span>
            <span className='pricerange'>₹0 - ₹{maxPrice}</span>
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
          <div className="sort-by">
            <span>Sort by:</span>
            <select value={sortOrder} onChange={handleSortChange}>
              <option value="newest">Newest</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="products-layout">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;