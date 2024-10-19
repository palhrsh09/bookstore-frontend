// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="flex justify-center bg-gray-200 py-2">
      <div className="flex space-x-4 w-full max-w-md">
        <Link to="/" className="text-blue-600 hover:underline">
          Book
        </Link>
        <Link to="/cart" className="text-blue-600 hover:underline">
           Cart
        </Link>
        <Link to="/orders" className="text-blue-600 hover:underline">
           Orders
        </Link>

        <Link to="/logout" className="text-red-600 hover:underline">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Header;
