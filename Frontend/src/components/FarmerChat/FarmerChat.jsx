// // CustomerSupportUI.jsx
// import React, { useState } from 'react';
// import { BsSearch, BsPaperclip, BsSend } from 'react-icons/bs';
// import { FaCircle } from 'react-icons/fa';
// import './FarmerChat.css';
// // Import the user image from your assets
// import userImage from '../../assets/priya-singh.jpg'; // Update this path to match your asset location

// const FarmerChat = () => {
//   const [message, setMessage] = useState('');
//   const [activeTab, setActiveTab] = useState('Recent');

//   return (
//     <div className="customer-support-container">
//       {/* Left Panel */}
//       <div className="left-panel">
//         <div className="search-container">
//           <BsSearch className="search-icon" />
//           <input type="text" placeholder="Search messages..." className="search-input" />
//         </div>
        
//         <div className="tabs-container">
//           <button 
//             className={`tab-button ${activeTab === 'Unread' ? 'active' : ''}`}
//             onClick={() => setActiveTab('Unread')}
//           >
//             Unread
//           </button>
//           <button 
//             className={`tab-button ${activeTab === 'Recent' ? 'active' : ''}`}
//             onClick={() => setActiveTab('Recent')}
//           >
//             Recent
//           </button>
//           <button 
//             className={`tab-button ${activeTab === 'Product Inquiry' ? 'active' : ''}`}
//             onClick={() => setActiveTab('Product Inquiry')}
//           >
//             Product Inquiry
//           </button>
//         </div>
        
//         <div className="conversations-list">
//           <div className="conversation-item selected">
//             <div className="avatar">
//               <img src={userImage} alt="Sarah Johnson" />
//             </div>
//             <div className="conversation-details">
//               <div className="conversation-header">
//                 <span className="customer-name">Sarah Johnson</span>
//                 <span className="message-time">10:45 AM</span>
//               </div>
//               <div className="message-preview">Is the organic tomatoes still available?</div>
//               <div className="message-date">15/03/2025</div>
//             </div>
//           </div>
//           {/* Additional conversation items would go here */}
//         </div>
//       </div>
      
//       {/* Right Panel */}
//       <div className="right-panel">
//         <div className="customer-header">
//           <div className="customer-info">
//             <img src={userImage} alt="Sarah Johnson" className="customer-avatar" />
//             <div className="customer-details">
//               <div className="customer-name">Sarah Johnson</div>
//               <div className="customer-status">
//                 <FaCircle className="status-icon online" />
//                 <span>Online</span>
//               </div>
//             </div>
//           </div>
//           <div className="chat-started">Chat started on 12/03/2025</div>
//         </div>
        
//         <div className="messages-container">
//           <div className="date-separator">14 March 2025</div>
          
//           <div className="message customer-message">
//             <div className="message-content">
//               Hello! I'm interested in your organic tomatoes.
//             </div>
//             <div className="message-time">10:30 AM</div>
//           </div>
          
//           <div className="message admin-message">
//             <div className="message-content">
//               Hi Sarah! Yes, they're available. How many pounds would you like?
//             </div>
//             <div className="message-time">10:32 AM</div>
//           </div>
//         </div>
        
//         <div className="message-input-container">
//           <BsPaperclip className="attachment-icon" />
//           <input 
//             type="text" 
//             placeholder="Type your message..." 
//             className="message-input"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button className="send-button">
//             <BsSend className="send-icon" />
//           </button>
//         </div>
        
//         <div className="quick-replies">
//           <button className="quick-reply-button">Yes, available</button>
//           <button className="quick-reply-button">Price details</button>
//           <button className="quick-reply-button">Shipping info</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarmerChat;

// FarmerChat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { BsSearch, BsPaperclip, BsSend } from 'react-icons/bs';
import { FaCircle } from 'react-icons/fa';
import io from 'socket.io-client';
import './FarmerChat.css';
import userImage from '../../assets/priya-singh.jpg'; // Update this path to match your asset location

const socket = io('http://localhost:5000'); // Connect to your backend

const FarmerChat = ({ currentUserEmail, userType }) => {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('Recent');
  const [selectedChat, setSelectedChat] = useState(null); // Currently selected chat
  const [chats, setChats] = useState([]); // List of recent chats
  const [messages, setMessages] = useState([]); // Messages in the selected chat
  const messagesEndRef = useRef(null); // For auto-scrolling to the latest message

  // Fetch all chats for the current customer/farmer on mount
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const endpoint = userType === 'customer'
          ? `/chat/conversations/customer/${currentUserEmail}`
          : `/chat/conversations/farmer/${currentUserEmail}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        setChats(data);

        // Select the first chat by default (optional)
        if (data.length > 0 && !selectedChat) {
          selectChat(data[0]);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [currentUserEmail, userType]);

  // Join chat room and fetch messages when a chat is selected
  useEffect(() => {
    if (selectedChat) {
      const { userEmail, farmerEmail } = selectedChat;
      socket.emit('joinChat', { userEmail, farmerEmail });

      const fetchMessages = async () => {
        try {
          const response = await fetch(`/chat/history?userEmail=${userEmail}&farmerEmail=${farmerEmail}`);
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();
    }

    // Listen for incoming messages
    socket.on('receiveMessage', (message) => {
      if (selectedChat &&
          ((message.sender.email === selectedChat.userEmail && message.sender.type === 'customer') ||
           (message.sender.email === selectedChat.farmerEmail && message.sender.type === 'farmer'))) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [selectedChat]);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const sendMessage = () => {
    if (message.trim() === '' || !selectedChat) return;

    const newMessage = {
      senderType: userType,
      senderEmail: currentUserEmail,
      receiverType: userType === 'customer' ? 'farmer' : 'customer',
      receiverEmail: userType === 'customer' ? selectedChat.farmerEmail : selectedChat.userEmail,
      content: message,
    };

    socket.emit('sendMessage', newMessage);
    setMessage('');
  };

  // Handle chat selection
  const selectChat = (chat) => {
    setSelectedChat({
      userEmail: chat.userEmail,
      farmerEmail: chat.farmerEmail,
      name: userType === 'customer' ? chat.farmerName : chat.userName,
    });
  };

  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Format time for display
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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
          {chats.map((chat) => (
            <div
              key={`${chat.userEmail}-${chat.farmerEmail}`}
              className={`conversation-item ${selectedChat?.userEmail === chat.userEmail && selectedChat?.farmerEmail === chat.farmerEmail ? 'selected' : ''}`}
              onClick={() => selectChat(chat)}
            >
              <div className="avatar">
                <img src={userImage} alt={userType === 'customer' ? chat.farmerName : chat.userName} />
              </div>
              <div className="conversation-details">
                <div className="conversation-header">
                  <span className="customer-name">{userType === 'customer' ? chat.farmerName : chat.userName}</span>
                  <span className="message-time">{formatTime(chat.lastMessageAt)}</span>
                </div>
                <div className="message-preview">{chat.lastMessage?.content}</div>
                <div className="message-date">{formatDate(chat.lastMessageAt)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        {selectedChat ? (
          <>
            <div className="customer-header">
              <div className="customer-info">
                <img src={userImage} alt={selectedChat.name} className="customer-avatar" />
                <div className="customer-details">
                  <div className="customer-name">{selectedChat.name}</div>
                  <div className="customer-status">
                    <FaCircle className="status-icon online" />
                    <span>Online</span>
                  </div>
                </div>
              </div>
              <div className="chat-started">
                Chat started on {formatDate(chats.find(chat => chat.userEmail === selectedChat.userEmail && chat.farmerEmail === selectedChat.farmerEmail)?.lastMessageAt)}
              </div>
            </div>

            <div className="messages-container">
              {messages.map((message, index) => (
                <div key={index}>
                  {(index === 0 || new Date(message.createdAt).toDateString() !== new Date(messages[index - 1].createdAt).toDateString()) && (
                    <div className="date-separator">{formatDate(message.createdAt)}</div>
                  )}
                  <div className={`message ${message.sender.email === currentUserEmail ? 'admin-message' : 'customer-message'}`}>
                    <div className="message-content">{message.content}</div>
                    <div className="message-time">{formatTime(message.createdAt)}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="message-input-container">
              <BsPaperclip className="attachment-icon" />
              <input
                type="text"
                placeholder="Type your message..."
                className="message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button className="send-button" onClick={sendMessage}>
                <BsSend className="send-icon" />
              </button>
            </div>

            <div className="quick-replies">
              <button className="quick-reply-button" onClick={() => setMessage('Yes, available')}>Yes, available</button>
              <button className="quick-reply-button" onClick={() => setMessage('Price details')}>Price details</button>
              <button className="quick-reply-button" onClick={() => setMessage('Shipping info')}>Shipping info</button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
};

export default FarmerChat;