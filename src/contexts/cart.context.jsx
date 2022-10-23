import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, ProductToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === ProductToAdd.id
  );
  if (existingCartItem) {
    return cartItems.map(
      (cartItem) =>
        cartItem.id === ProductToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem //
    );
  }
  return [...cartItems, { ...ProductToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, CartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === CartItemToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== CartItemToRemove.id);
  }
  return cartItems.map(
    (cartItem) =>
      cartItem.id === CartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem //
  );
};

const clearCartItem = (cartItems, CartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== CartItemToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearCartItem: () => {},
  cartCount: 0,
  cartTotal: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (ProductToAdd) => {
    setCartItems(addCartItem(cartItems, ProductToAdd));
  };

  const removeItemToCart = (CartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, CartItemToRemove));
  };

  const clearItemFromCart = (CartItemToRemove) => {
    setCartItems(clearCartItem(cartItems, CartItemToRemove));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
