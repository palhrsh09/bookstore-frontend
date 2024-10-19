import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { basepath } from '../../api';
import Modal from './Modal'; // Import the Modal component

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState(null); // State to hold the selected order
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    // Function to fetch order history from the backend
    const fetchOrderHistory = async () => {
        try {
            const response = await axios.get(`${basepath}/api/orders/history`, { withCredentials: true });
            setOrders(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error fetching order history');
            setLoading(false);
        }
    };

    // Function to fetch order details
    const fetchOrderDetails = async (orderId) => {
        try {
            const response = await axios.get(`${basepath}/api/orders/${orderId}`, { withCredentials: true });
            setSelectedOrder(response.data);
            setIsModalOpen(true);
        } catch (err) {
            setError('Error fetching order details');
        }
    };

    // Fetch order history when the component mounts
    useEffect(() => {
        fetchOrderHistory();
    }, []);

    // Display a loading message while data is being fetched
    if (loading) {
        return <div className="text-center text-xl">Loading your orders...</div>;
    }

    // Display an error message if something goes wrong
    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Your Order History</h1>
            {orders.length === 0 ? (
                <p className="text-center">You have no orders.</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b text-left text-gray-600">Order ID</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600">Total Amount</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600">Status</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order?.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => fetchOrderDetails(order?.id)}>
                                <td className="py-2 px-4 border-b">{order?.id}</td>
                                <td className="py-2 px-4 border-b">${parseFloat(order?.total_amount).toFixed(2)}</td>
                                <td className="py-2 px-4 border-b capitalize">{order?.status}</td>
                                <td className="py-2 px-4 border-b">{new Date(order?.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                order={selectedOrder} 
            />
        </div>
    );
};

export default OrderHistory;
