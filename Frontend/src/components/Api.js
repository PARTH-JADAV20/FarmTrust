import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch all products
export const getAllProducts = async () => {
  try {
    const response = await api.get('/farmers/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/farmers/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};

export const getFarmerByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/farmers/${email}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching farmer:', error);
    throw error.response?.data?.message || 'Failed to fetch farmer';
  }
};

export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${email}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error.response?.data?.message || 'Failed to fetch user';
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error.response?.data?.message || 'Failed to fetch all orders';
  }
};
