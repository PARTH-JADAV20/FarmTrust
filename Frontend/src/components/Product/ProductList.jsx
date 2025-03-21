import React, { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import '../Product/ProductList.css';
import { getAllProducts } from '../Api';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts(); 
        const transformedProducts = data.products.map((product, index) => ({
          id: product.id,
          name: product.name,
          price: product.mrpPerKg,
          rating: product.rating.average || 0, 
          reviews: product.rating.count || 0,  
          image: product.images[0],           
          category: product.category.charAt(0).toUpperCase() + product.category.slice(1) 
        }));
        setProducts(transformedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []); 

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
    console.log(product)
    return (
      <Link to={`/products/${product.id}`} className="product-card2"> 
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
          <button className="add-to-cart-btn" onClick={(e) => e.preventDefault()}>Add to Cart</button>
        </div>
      </Link>
    );
  };

  const categories = ['All', ...new Set(products.map(product => product.category))];

  if (loading) {
    return <div>Loading products...</div>; 
  }

  return (
    <div className="Productlist-container">
      <div className="explore-section">
        <h1>Explore Natural Products</h1>
        <div className="categories">
          {categories.map(category => (
            <button
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="price-sort">
          <div className="price-range">
            <span className="price-span">Price Range</span>
            <span className="pricerange">₹0 - ₹{maxPrice}</span>
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