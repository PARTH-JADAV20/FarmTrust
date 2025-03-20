import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaCheck, FaTimes, FaAngleDown } from 'react-icons/fa';
import './FarmerOrders.css';

// Import images correctly
import Image1 from '../../assets/tomatoes.jpg';
import Image2 from '../../assets/potatoes.jpg';
import Image3 from '../../assets/carrots.jpg'; // Added missing image
import Profile1 from '../../assets/rajesh-kumar.jpg';
import Profile2 from '../../assets/priya-singh.jpg';
import Profile3 from '../../assets/yash.jpg'; // Added missing image

const FarmerOrders = () => {
  // Sample data with fixed image references
  const initialOrders = [
    {
      id: 1,
      orderDate: "Jan 15, 2025",
      product: "Organic Tomatoes",
      productImage: Image1, // Fixed image reference
      consumer: "John Smith",
      consumerImage: Profile1, // Fixed image reference
      quantity: "25 Kg",
      totalPrice: "₹75.00",
      status: "Pending",
      consumerDetails: {
        address: "123 Farm Road, Green Valley",
        contactNumber: "+91 9876543210"
      }
    },
    {
      id: 2,
      orderDate: "Jan 10, 2025",
      product: "Fresh Potatoes",
      productImage: Image2, // Fixed image reference
      consumer: "Sarah Johnson",
      consumerImage: Profile2, // Fixed image reference
      quantity: "10 Kg",
      totalPrice: "₹45.00",
      status: "Confirmed",
      consumerDetails: {
        address: "456 Harvest Lane, Rural County",
        contactNumber: "+91 9876543211"
      }
    },
    {
      id: 3,
      orderDate: "Jan 5, 2025",
      product: "Organic Carrots",
      productImage: Image3, // Fixed image reference
      consumer: "Michael Brown",
      consumerImage: Profile3, // Fixed image reference
      quantity: "15 Kg",
      totalPrice: "₹60.00",
      status: "Canceled",
      consumerDetails: {
        address: "789 Field Street, Agriculture Town",
        contactNumber: "+91 9876543212"
      }
    }
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState(initialOrders);
  const [orderFilter, setOrderFilter] = useState("All Orders");
  const [sortOrder, setSortOrder] = useState("Newest First");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Add state for dropdown toggles
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  // Create refs for dropdowns to detect outside clicks
  const filterDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter orders based on status
  const filterOrders = (status) => {
    setOrderFilter(status);
    setIsFilterOpen(false); // Close dropdown after selection
    
    if (status === "All Orders") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  // Sort orders based on date
  const sortOrders = (sortType) => {
    setSortOrder(sortType);
    setIsSortOpen(false); // Close dropdown after selection
    
    let sorted = [...filteredOrders];
    if (sortType === "Newest First") {
      sorted.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    } else {
      sorted.sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
    }
    setFilteredOrders(sorted);
  };

  // Search orders by consumer or product name
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === "") {
      filterOrders(orderFilter); // Reset to current filter
    } else {
      const results = orders.filter(order => 
        order.consumer.toLowerCase().includes(term) || 
        order.product.toLowerCase().includes(term)
      );
      setFilteredOrders(results);
    }
  };

  // Open order details modal
  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Close order details modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? {...order, status: newStatus} : order
    );
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders.filter(order => 
      orderFilter === "All Orders" || order.status === orderFilter
    ));
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({...selectedOrder, status: newStatus});
    }
  };

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search orders..." 
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className="search-icon-d" />
        </div>
      </div>
      
      <div className="filter-sort-container">
        <div className="filter-dropdown" ref={filterDropdownRef}>
          <button className="dropdown-button" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            {orderFilter} <FaAngleDown />
          </button>
          {isFilterOpen && (
            <div className="dropdown-content">
              <div onClick={() => filterOrders("All Orders")}>All Orders</div>
              <div onClick={() => filterOrders("Pending")}>Pending</div>
              <div onClick={() => filterOrders("Confirmed")}>Confirmed</div>
              <div onClick={() => filterOrders("Canceled")}>Canceled</div>
            </div>
          )}
        </div>
        
        <div className="sort-dropdown" ref={sortDropdownRef}>
          <button className="dropdown-button" onClick={() => setIsSortOpen(!isSortOpen)}>
            Sort: {sortOrder} <FaAngleDown />
          </button>
          {isSortOpen && (
            <div className="dropdown-content">
              <div onClick={() => sortOrders("Newest First")}>Newest First</div>
              <div onClick={() => sortOrders("Oldest First")}>Oldest First</div>
            </div>
          )}
        </div>
      </div>
      
      <div className="orders-table">
        <div className="table-header">
          <div className="header-item">Order Date</div>
          <div className="header-item">Product</div>
          <div className="header-item">Consumer</div>
          <div className="header-item">Quantity</div>
          <div className="header-item">Total Price</div>
          <div className="header-item">Status</div>
          <div className="header-item">Actions</div>
        </div>
        
        {filteredOrders.map(order => (
          <div key={order.id} className="order-row" onClick={() => openOrderModal(order)}>
            <div className="order-item">{order.orderDate}</div>
            <div className="order-item product-item-d3">
              <img src={order.productImage} alt={order.product} className="product-thumbnail-d3" />
              <span>{order.product}</span>
            </div>
            <div className="order-item consumer-item">
              <img src={order.consumerImage} alt={order.consumer} className="consumer-thumbnail" />
              <span>{order.consumer}</span>
            </div>
            <div className="order-item">{order.quantity}</div>
            <div className="order-item">{order.totalPrice}</div>
            <div className="order-item">
              <span className={`order-status-d1 ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
            <div className="order-item actions-d3">
              <button className="action-btn-d3 approve-d3" onClick={(e) => {
                e.stopPropagation();
                updateOrderStatus(order.id, "Confirmed");
              }}>
                <FaCheck />
              </button>
              <button className="action-btn-d3 reject-d3" onClick={(e) => {
                e.stopPropagation();
                updateOrderStatus(order.id, "Canceled");
              }}>
                <FaTimes />
              </button>
            </div>
          </div>
        ))}
        
        {filteredOrders.length === 0 && (
          <div className="no-orders">No orders found</div>
        )}
      </div>
      
      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Order Details</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="product-details-d3">
                <img src={selectedOrder.productImage} alt={selectedOrder.product} className="product-image-d3" />
                <div className="product-info-d3">
                  <h3>{selectedOrder.product}</h3>
                  <div className="order-detail">
                    <span>Order Date: {selectedOrder.orderDate}</span>
                  </div>
                  <div className="order-detail">
                    <span>Quantity: {selectedOrder.quantity}</span>
                  </div>
                  <div className="order-detail price">
                    <span>Total: {selectedOrder.totalPrice}</span>
                  </div>
                </div>
              </div>
              
              <div className="consumer-details">
                <h3>Consumer Details</h3>
                <div className="consumer-info">
                  <div className="consumer-avatar">
                    <img src={selectedOrder.consumerImage} alt={selectedOrder.consumer} />
                    <span>{selectedOrder.consumer}</span>
                  </div>
                  <div className="consumer-contact">
                    <div><strong>Address:</strong> {selectedOrder.consumerDetails.address}</div>
                    <div><strong>Contact:</strong> {selectedOrder.consumerDetails.contactNumber}</div>
                  </div>
                </div>
              </div>
              
              <div className="order-actions-d3">
                <div className="status-update-d3">
                  <span>Status: </span>
                  <select 
                    value={selectedOrder.status}
                    onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                    className={`status-dropdown-d3 ${selectedOrder.status.toLowerCase()}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerOrders;