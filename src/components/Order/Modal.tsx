import React from 'react';

const Modal = ({ isOpen, onClose, order }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4">Order Details</h2>
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Total Amount:</strong> ${parseFloat(order.total_amount).toFixed(2)}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                {/* Add more fields as necessary */}
                <button 
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded" 
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
