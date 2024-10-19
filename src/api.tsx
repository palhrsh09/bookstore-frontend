import axios from 'axios';

// Base path for the server
export const basepath = 'http://localhost:5000';

// Auth Routes
export const registerUser = (userData) => axios.post(`${basepath}/api/auth/register`, userData, { withCredentials: true });
export const loginUser = (loginData) => axios.post(`${basepath}/api/auth/login`, loginData, { withCredentials: true });
export const getUserDetails = () => axios.get(`${basepath}/api/auth/me`, { withCredentials: true });

// Book Routes (No need for credentials unless specific user data is needed)
export const getBooks = () => axios.get(`${basepath}/api/books`);
export const getBookDetails = (id) => axios.get(`${basepath}/api/books/${id}`);

// Cart Routes (Require credentials since cart is user-specific)
export const getCartItems = () => axios.get(`${basepath}/api/cart`, { withCredentials: true });
export const addToCart = (itemData) => axios.post(`${basepath}/api/cart/create`, itemData, { withCredentials: true });
export const removeFromCart = (id) => axios.delete(`${basepath}/api/cart/${id}`, { withCredentials: true });

// Order Routes (Require credentials since order is user-specific)
export const placeOrder = (orderData) => axios.post(`${basepath}/api/orders`, orderData, { withCredentials: true });
export const getOrders = () => axios.get(`${basepath}/api/orders`, { withCredentials: true });
export const getOrderDetails = (id) => axios.get(`${basepath}/api/orders/${id}`, { withCredentials: true });

export const addBook  = (bookData) => axios.post(`${basepath}/api/books/create`,bookData, { withCredentials: true });
