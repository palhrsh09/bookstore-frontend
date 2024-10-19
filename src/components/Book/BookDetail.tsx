import React from "react";
import Modal from "react-modal"

const BookDetailModal = ({ isOpen, onClose, book }) => {
  if (!book) return null; // If no book is selected, do not render the modal

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Book Details"
      className="bg-white p-6 rounded shadow-lg"
      ariaHideApp={false}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold">{book.title}</h2>
        {book.image && (
          <img
            src={`http://localhost:5000/${book.image}`}
            alt={book.title}
            className="w-full h-64 object-cover mb-4"
          />
        )}
        <p>{book.description}</p>
        <p className="font-semibold">Price: ${book.price}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default BookDetailModal;
