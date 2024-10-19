import React, { useState } from 'react';
import { addBook } from '../../api'; // Import the API function

const AddBookModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null); // State to store the image file

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title && author && price && description && image) {
            try {
                const formData = new FormData();
                formData.append('title', title);
                formData.append('author', author);
                formData.append('price', price);
                formData.append('description', description);
                formData.append('image', image); // Append the image to the form data

                const response = await addBook(formData); // Pass FormData to the API
                if (response.data.success) {
                    onClose(); // Close the modal on success
                }

                // Reset form fields
                setTitle('');
                setAuthor('');
                setPrice('');
                setDescription('');
                setImage(null);
            } catch (error) {
                console.error('Error adding book:', error);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Add New Book</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    ></textarea>
                    
                    {/* File input for image */}
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])} // Handle file input
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500 hover:underline"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Add Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBookModal;
