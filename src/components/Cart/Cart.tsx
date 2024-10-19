import React, { useEffect, useState } from "react";
import { removeFromCart, getCartItems, placeOrder, basepath } from "../../api"; // Ensure `placeOrder` is imported
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartId, setCartId] = useState<number | null>(null); // Store cartId
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setIsLoading(true);
        const response = await getCartItems();

        if (response && response.data && response.data.data) {
          const { cartId, items } = response.data.data; // Destructure cartId and items
          setCartItems(items);
          setCartId(cartId); // Save the cartId
          calculateTotal(items);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        setError("Failed to load cart items. Please try again.");
        setCartItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
    setTotalAmount(total.toFixed(2));
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await removeFromCart(cartItemId);
      setCartItems((prevItems) => {
        const updatedItems = prevItems.filter((item) => item.cart_item_id !== cartItemId); // Use cart_item_id
        calculateTotal(updatedItems);
        return updatedItems;
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setError("Failed to remove item. Please try again.");
    }
  };

  const handleQuantityChange = (cartItemId, newQuantity) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.cart_item_id === cartItemId ? { ...item, quantity: newQuantity } : item
      );
      calculateTotal(updatedItems);
      return updatedItems;
    });
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.get(`${basepath}/api/orders/place-order`, { withCredentials: true });
      alert("Order placed successfully!");
      setCartItems([]); // Clear the cart items on the frontend after placing the order
    } catch (error) {
      alert("Error placing order. Please try again.");
    }
  };

  console.log(cartItems, "cart");

  if (isLoading) return <div>Loading cart...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {cartItems.map((item) => (
            <div key={item.cart_item_id} className="border p-4 rounded-md shadow flex justify-between">
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p>{item.author}</p>
                <p>Price: ${item.price}</p>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.cart_item_id, parseInt(e.target.value, 10))} // Use cart_item_id
                  className="border rounded p-1 w-16"
                />
              </div>
              <button
                onClick={() => handleRemoveItem(item.cart_item_id)} // Use cart_item_id
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <h3 className="mt-4 text-xl font-bold">Total: ${totalAmount}</h3>
      <button
        onClick={handlePlaceOrder}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
      >
        Place Order
      </button>
    </div>
  );
};

export default Cart;
