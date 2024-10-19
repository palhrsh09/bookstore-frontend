import React, { useEffect, useState } from "react";
import { getBooks, getBookDetails, addToCart } from "../../api";
import AddBookModal from "./AddBookModel"; // Existing AddBookModal
import BookDetailModal from "./BookDetail"; // Import new BookDetailModal

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null); // To store selected book details

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        if (Array.isArray(response.data.data)) {
          setBooks(response.data.data);
        } else {
          console.error("Expected an array, but got:", response.data.data);
          setBooks([]);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      }
    };

    fetchBooks();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null); // Reset selected book when modal closes
  };

  // Handle "View Details" click
  const handleViewDetails = async (bookId) => {
    try {
      const response = await getBookDetails(bookId); // Fetch book details
      setSelectedBook(response.data); // Set the selected book details
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };


  const handleAddToCart = async (book) => {
    try {
      const itemData = {
        book: {
          id: book.id,
          title: book.title,
          author: book.author,
          price: book.price, // Include the price of the book
        },
        quantity: 1, // Default quantity, or make it dynamic
      };

      const response = await addToCart(itemData); // Send the data to the API
      console.log("Book added to cart:", response.data);
    } catch (error) {
      console.error("Error adding book to cart:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Book List</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Create New Book
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id} className="border p-4 rounded-md shadow">
            {/* Conditional rendering for the image */}
            {book.image ? (
              <img
                src={`http://localhost:5000/${book.image}`}
                alt={book.title}
                className="w-full h-48 object-cover mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4">
                <span>No Image Available</span>
              </div>
            )}
            <h3 className="font-semibold">{book.title}</h3>
            <p>{book.author}</p>
            <p className="font-semibold">${book.price}</p>

            {/* Replace the Link with a button to trigger the modal */}
            <button
              onClick={() => handleViewDetails(book.id)} // Fetch and open modal with details
              className="text-blue-500 hover:underline"
            >
              View Details
            </button>

            {/* Add "Add to Cart" button */}
            <button
              onClick={() => handleAddToCart(book)}
              className="bg-green-600 text-white px-3 py-1 mt-4 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Modal to show book details */}
      <BookDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        book={selectedBook} // Pass the selected book details to the modal
      />
      
      <AddBookModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default BookList;
