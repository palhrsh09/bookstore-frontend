// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from "./AuthContext" 
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import BookList from './components/Book/BookList';
import BookDetail from './components/Book/BookDetail';
import Cart from './components/Cart/Cart';
import Orders from './Order';
import ProtectedRoute from './components/ProtectedRoutes';
import Header from './components/Header';
import OrderHistory from './components/Order/OrderHistory';

const App = () => {

    const HeaderWrapper = () => {
        const location = useLocation(); // Get the current location
      
        // Check if the current path is either /login or /register
        const showHeader = !(location.pathname === '/login' || location.pathname === '/register');
      
        return showHeader ? <Header /> : null; // Render Header conditionally
      };

  return (
    <Router>
      <AuthProvider>
      {<HeaderWrapper />}
              <Routes>
                  <Route path="/" element={<ProtectedRoute> <BookList /></ProtectedRoute>} />
                  <Route path="/orders" element={<ProtectedRoute> <OrderHistory /></ProtectedRoute>} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/books/:id" element={<ProtectedRoute><BookDetail /></ProtectedRoute>} />
                  <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                  
                  {/* Protected routes */}
                  <Route path="/cart" element={
                      <ProtectedRoute>
                          <Cart />
                      </ProtectedRoute>
                  } />
                  <Route path="/orders" element={
                      <ProtectedRoute>
                          <Orders />
                      </ProtectedRoute>
                  } />
              </Routes>
          
      </AuthProvider>
      </Router>
  );
};

export default App;
