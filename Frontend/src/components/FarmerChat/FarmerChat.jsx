// CustomerSupportUI.jsx
import React, { useState } from 'react';
import { BsSearch, BsPaperclip, BsSend } from 'react-icons/bs';
import { FaCircle } from 'react-icons/fa';
import './FarmerChat.css';
// Import the user image from your assets
import userImage from '../../assets/priya-singh.jpg'; // Update this path to match your asset location

const FarmerChat = () => {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('Recent');

  return (
    <div className="customer-support-container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="search-container">
          <BsSearch className="search-icon" />
          <input type="text" placeholder="Search messages..." className="search-input" />
        </div>
        
        <div className="tabs-container">
          <button 
            className={`tab-button ${activeTab === 'Unread' ? 'active' : ''}`}
            onClick={() => setActiveTab('Unread')}
          >
            Unread
          </button>
          <button 
            className={`tab-button ${activeTab === 'Recent' ? 'active' : ''}`}
            onClick={() => setActiveTab('Recent')}
          >
            Recent
          </button>
          <button 
            className={`tab-button ${activeTab === 'Product Inquiry' ? 'active' : ''}`}
            onClick={() => setActiveTab('Product Inquiry')}
          >
            Product Inquiry
          </button>
        </div>
        
        <div className="conversations-list">
          <div className="conversation-item selected">
            <div className="avatar">
              <img src={userImage} alt="Sarah Johnson" />
            </div>
            <div className="conversation-details">
              <div className="conversation-header">
                <span className="customer-name">Sarah Johnson</span>
                <span className="message-time">10:45 AM</span>
              </div>
              <div className="message-preview">Is the organic tomatoes still available?</div>
              <div className="message-date">15/03/2025</div>
            </div>
          </div>
          {/* Additional conversation items would go here */}
        </div>
      </div>
      
      {/* Right Panel */}
      <div className="right-panel">
        <div className="customer-header">
          <div className="customer-info">
            <img src={userImage} alt="Sarah Johnson" className="customer-avatar" />
            <div className="customer-details">
              <div className="customer-name">Sarah Johnson</div>
              <div className="customer-status">
                <FaCircle className="status-icon online" />
                <span>Online</span>
              </div>
            </div>
          </div>
          <div className="chat-started">Chat started on 12/03/2025</div>
        </div>
        
        <div className="messages-container">
          <div className="date-separator">14 March 2025</div>
          
          <div className="message customer-message">
            <div className="message-content">
              Hello! I'm interested in your organic tomatoes.
            </div>
            <div className="message-time">10:30 AM</div>
          </div>
          
          <div className="message admin-message">
            <div className="message-content">
              Hi Sarah! Yes, they're available. How many pounds would you like?
            </div>
            <div className="message-time">10:32 AM</div>
          </div>
        </div>
        
        <div className="message-input-container">
          <BsPaperclip className="attachment-icon" />
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="send-button">
            <BsSend className="send-icon" />
          </button>
        </div>
        
        <div className="quick-replies">
          <button className="quick-reply-button">Yes, available</button>
          <button className="quick-reply-button">Price details</button>
          <button className="quick-reply-button">Shipping info</button>
        </div>
      </div>
    </div>
  );
};

export default FarmerChat;