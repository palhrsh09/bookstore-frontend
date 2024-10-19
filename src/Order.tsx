// src/components/Orders.js
import { useEffect, useState } from 'react';
import { getOrders } from './api';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrders();
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <h2>Order History</h2>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        Order ID: {order.id} - Total: ${order.total}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Orders;