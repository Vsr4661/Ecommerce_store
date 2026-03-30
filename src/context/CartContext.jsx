import { createContext, useState, useEffect } from "react";

// Create Context
export const CartContext = createContext();

function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState(() => {
    // Attempt to load previously saved cart items from localStorage on initial render
    const savedCart = localStorage.getItem("techzone_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync cartItems array to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("techzone_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to cart
  const addToCart = (product) => {

    setCartItems((prevItems) => {

      const existingItem = prevItems.find(
        (item) => item.id === product.id
      );

      // If item exists → increase quantity
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Else add new item
      return [
        ...prevItems,
        { ...product, quantity: 1 },
      ];

    });

  };

  // Remove item
  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  // Increase Quantity
  const increaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;