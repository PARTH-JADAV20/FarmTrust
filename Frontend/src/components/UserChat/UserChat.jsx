import React, { useState, useEffect, useRef } from 'react';
import { BsSearch, BsPaperclip, BsSend } from 'react-icons/bs';
import { FaCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import userImage from '../../assets/rajesh.jpg';
import './UserChat.css';

const socket = io('http://localhost:5000', {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  withCredentials: true,
});

const UserChat = () => {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('Recent');
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const currentUserEmail = sessionStorage.getItem('email');
  const userType = sessionStorage.getItem('role');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const farmerEmailFromQuery = queryParams.get('farmerEmail');

  useEffect(() => {
    if (!currentUserEmail || !userType) {
      console.log('User not logged in, redirecting to /login');
      navigate('/login');
    }
  }, [currentUserEmail, userType, navigate]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket.IO connected:', socket.id);
    });
    socket.on('connect_error', (err) => {
      console.error('Socket.IO connection error:', err.message);
      setError('Failed to connect to chat server. Please try again later.');
    });
    socket.on('disconnect', (reason) => {
      console.log('Socket.IO disconnected:', reason);
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('disconnect');
    };
  }, []);

  const fetchChats = async () => {
    try {
      const endpoint = userType === 'customer'
        ? `http://localhost:5000/chat/conversations/customer/${currentUserEmail}`
        : `http://localhost:5000/chat/conversations/farmer/${currentUserEmail}`;
      console.log('Fetching chats from:', endpoint);
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched chats:', data);
      setChats(data);

      // Join all chat rooms for this user
      data.forEach(chat => {
        const normalizedUserEmail = chat.userEmail.toLowerCase();
        const normalizedFarmerEmail = chat.farmerEmail.toLowerCase();
        socket.emit('joinChat', { userEmail: normalizedUserEmail, farmerEmail: normalizedFarmerEmail }, (response) => {
          console.log(`Joined chat room for ${normalizedUserEmail}_${normalizedFarmerEmail}:`, response || 'No response from server');
        });
      });

      if (farmerEmailFromQuery) {
        console.log('Farmer email from query:', farmerEmailFromQuery);
        const chatWithFarmer = data.find(chat => chat.farmerEmail.toLowerCase() === farmerEmailFromQuery.toLowerCase());
        if (chatWithFarmer) {
          console.log('Found existing chat:', chatWithFarmer);
          selectChat(chatWithFarmer);
        } else {
          console.log('No existing chat found, initiating new chat with:', farmerEmailFromQuery);
          const farmer = await fetchFarmerDetails(farmerEmailFromQuery);
          console.log('Fetched farmer details:', farmer);
          if (farmer && farmer.email) {
            const newChat = {
              userEmail: currentUserEmail,
              farmerEmail: farmerEmailFromQuery,
              farmerName: farmer.name,
              lastMessage: null,
              lastMessageAt: new Date(),
            };
            setChats(prevChats => {
              if (prevChats.some(chat => chat.farmerEmail.toLowerCase() === farmerEmailFromQuery.toLowerCase())) {
                return prevChats;
              }
              return [newChat, ...prevChats];
            });
            setSelectedChat({
              userEmail: currentUserEmail,
              farmerEmail: farmerEmailFromQuery,
              name: farmer.name,
            });
            // Join the new chat room
            socket.emit('joinChat', { userEmail: currentUserEmail.toLowerCase(), farmerEmail: farmerEmailFromQuery.toLowerCase() }, (response) => {
              console.log(`Joined new chat room for ${currentUserEmail.toLowerCase()}_${farmerEmailFromQuery.toLowerCase()}:`, response || 'No response from server');
            });
          } else {
            console.error('Failed to fetch farmer details for:', farmerEmailFromQuery);
            setError('Farmer not found. Please try another farmer.');
            navigate('/user/messages', { replace: true });
          }
        }
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
      setError('Failed to load chats. Please try again later.');
    }
  };

  useEffect(() => {
    if (!currentUserEmail || !userType) return;
    fetchChats();
  }, [currentUserEmail, userType, farmerEmailFromQuery, navigate]);

  const fetchFarmerDetails = async (farmerEmail) => {
    try {
      const response = await fetch(`http://localhost:5000/api/farmer/${farmerEmail}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching farmer details:', error);
      return null;
    }
  };

  useEffect(() => {
    if (!selectedChat) return;

    const { userEmail, farmerEmail } = selectedChat;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/chat/history?userEmail=${userEmail}&farmerEmail=${farmerEmail}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched messages:', data);
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Failed to load messages. Please try again.');
      }
    };

    fetchMessages();
  }, [selectedChat]);

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      console.log('Received message in UserChat:', message);
      console.log('Current selectedChat:', selectedChat);
      if (!selectedChat) {
        console.log('No selected chat, ignoring message');
        return;
      }
      const room = `${selectedChat.userEmail.toLowerCase()}_${selectedChat.farmerEmail.toLowerCase()}`;
      const messageRoom = `${message.sender.type === 'customer' ? message.sender.email.toLowerCase() : message.receiverEmail.toLowerCase()}_${message.sender.type === 'farmer' ? message.sender.email.toLowerCase() : message.receiverEmail.toLowerCase()}`;
      if (room === messageRoom) {
        console.log('Message matches selected chat room, adding to messages');
        setMessages((prevMessages) => [...prevMessages, message]);
        setChats(prevChats => {
          const updatedChats = prevChats.map(chat => {
            if (chat.userEmail.toLowerCase() === selectedChat.userEmail.toLowerCase() && 
                chat.farmerEmail.toLowerCase() === selectedChat.farmerEmail.toLowerCase()) {
              return {
                ...chat,
                lastMessage: message,
                lastMessageAt: new Date(),
              };
            }
            return chat;
          });
          return updatedChats.sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt));
        });
      } else {
        console.log('Message does not match selected chat room, ignoring');
        console.log('Expected room:', room, 'Message room:', messageRoom);
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() === '' || !selectedChat) {
      console.log('Cannot send message: Empty message or no chat selected');
      return;
    }

    const newMessage = {
      senderType: userType,
      senderEmail: currentUserEmail,
      receiverType: userType === 'customer' ? 'farmer' : 'customer',
      receiverEmail: userType === 'customer' ? selectedChat.farmerEmail : selectedChat.userEmail,
      content: message,
    };

    console.log('Sending message:', newMessage);
    socket.emit('sendMessage', newMessage, (response) => {
      if (response && response.error) {
        console.error('Error sending message:', response.error, 'Details:', response.details);
        setError(`Failed to send message: ${response.details}`);
      } else {
        console.log('Message sent successfully:', response);
        fetchChats();
      }
    });
    setMessage('');
  };

  const selectChat = (chat) => {
    setSelectedChat({
      userEmail: chat.userEmail,
      farmerEmail: chat.farmerEmail,
      name: userType === 'customer' ? chat.farmerName : chat.userName,
    });
    setError(null);
    navigate(`/user/messages?farmerEmail=${chat.farmerEmail}`, { replace: true });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!currentUserEmail || !userType) {
    return null;
  }

  return (
    <div className="user-chat-container">
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
          {error && <div className="error-message">{error}</div>}
          {chats.length === 0 && farmerEmailFromQuery ? (
            <div className="no-chats">Starting a new chat...</div>
          ) : chats.length === 0 ? (
            <div className="no-chats">No chats yet. Start a conversation!</div>
          ) : (
            chats.map((chat) => (
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
                    <span className="user-name">{userType === 'customer' ? chat.farmerName : chat.userName}</span>
                    <span className="message-time">{formatTime(chat.lastMessageAt)}</span>
                  </div>
                  <div className="message-preview">{chat.lastMessage?.content || 'No messages yet'}</div>
                  <div className="message-date">{formatDate(chat.lastMessageAt)}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="right-panel">
        {error && <div className="error-message">{error}</div>}
        {selectedChat ? (
          <>
            <div className="chat-header">
              <div className="user-info">
                <img src={userImage} alt={selectedChat.name} className="user-avatar" />
                <div className="user-details">
                  <div className="user-name">{selectedChat.name}</div>
                  <div className="user-status">
                    <FaCircle className="status-icon online" />
                    <span>Online</span>
                  </div>
                </div>
              </div>
              <div className="chat-started">
                Chat started on {formatDate(chats.find(chat => chat.userEmail === selectedChat.userEmail && chat.farmerEmail === selectedChat.farmerEmail)?.lastMessageAt || new Date())}
              </div>
            </div>

            <div className="messages-container">
              {messages.length === 0 ? (
                <div className="no-messages">No messages yet. Start the conversation!</div>
              ) : (
                messages.map((message, index) => (
                  <div key={index}>
                    {(index === 0 || new Date(message.createdAt).toDateString() !== new Date(messages[index - 1].createdAt).toDateString()) && (
                      <div className="date-separator">{formatDate(message.createdAt)}</div>
                    )}
                    <div className={`message ${message.sender.email === currentUserEmail ? 'sent-message' : 'received-message'}`}>
                      <div className="message-content">{message.content}</div>
                      <div className="message-time">{formatTime(message.createdAt)}</div>
                    </div>
                  </div>
                ))
              )}
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
              <button className="quick-reply-button" onClick={() => setMessage('Hey there!')}>Hey there!</button>
              <button className="quick-reply-button" onClick={() => setMessage('How’s it going?')}>How’s it going?</button>
              <button className="quick-reply-button" onClick={() => setMessage('See you later')}>See you later</button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
};

export default UserChat;