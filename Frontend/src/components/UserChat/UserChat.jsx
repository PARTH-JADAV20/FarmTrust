import React, { useState } from 'react';
import { BsSearch, BsPaperclip, BsSend } from 'react-icons/bs';
import { FaCircle } from 'react-icons/fa';
import userImage from '../../assets/priya-singh.jpg'; 
import './UserChat.css'; // Make sure to uncomment and use this

const UserChat = () => {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('Recent');

  return (
    <div className="user-chat-container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="search-container">
          <BsSearch className="search-icon" />
          <input type="text" placeholder="Search chats..." className="search-input" />
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
        </div>
        
        <div className="conversations-list">
          <div className="conversation-item selected">
            <div className="avatar">
              <img src={userImage} alt="Priya Singh" />
            </div>
            <div className="conversation-details">
              <div className="conversation-header">
                <span className="user-name">Priya Singh</span>
                <span className="message-time">11:20 AM</span>
              </div>
              <div className="message-preview">Hey, how’s it going?</div>
              <div className="message-date">20/03/2025</div>
            </div>
          </div>
          {/* Add more conversation items as needed */}
        </div>
      </div>
      
      {/* Right Panel */}
      <div className="right-panel">
        <div className="chat-header">
          <div className="user-info">
            <img src={userImage} alt="Priya Singh" className="user-avatar" />
            <div className="user-details">
              <div className="user-name">Priya Singh</div>
              <div className="user-status">
                <FaCircle className="status-icon online" />
                <span>Online</span>
              </div>
            </div>
          </div>
          <div className="chat-started">Chat started on 18/03/2025</div>
        </div>
        
        <div className="messages-container">
          <div className="date-separator">20 March 2025</div>
          
          <div className="message received-message">
            <div className="message-content">
              Hi! How are you today?
            </div>
            <div className="message-time">11:15 AM</div>
          </div>
          
          <div className="message sent-message">
            <div className="message-content">
              Hey! I’m good, thanks. How about you?
            </div>
            <div className="message-time">11:17 AM</div>
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
          <button className="quick-reply-button">Hey there!</button>
          <button className="quick-reply-button">How’s it going?</button>
          <button className="quick-reply-button">See you later</button>
        </div>
      </div>
    </div>
  );
};

export default UserChat;