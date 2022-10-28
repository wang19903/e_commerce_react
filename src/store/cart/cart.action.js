import { CART_ACTION_TYPES } from "./cart.type";
import { createAction } from "../../utils/reducer/reducer.utils";

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

export const clearCartItem = (cartItems, CartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== CartItemToClear.id);
};

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, ProductToAdd) => {
  const newCartItems = addCartItem(cartItems, ProductToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemToCart = (cartItems, CartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, CartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, CartItemToRemove) => {
  const newCartItems = clearCartItem(cartItems, CartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
