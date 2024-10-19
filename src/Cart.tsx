// src/components/Cart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCartItems, removeFromCart } from './api';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await getCartItems()
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);

    const handleRemove = async (itemId) => {
        await removeFromCart(itemId)
        setCartItems(cartItems.filter(item => item.id !== itemId)); // Update local state
    };

    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        {item.bookTitle} - {item.quantity}
                        <button onClick={() => handleRemove(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;