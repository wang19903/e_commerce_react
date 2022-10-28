// import { createContext, useReducer } from "react";
// import { createAction } from "../utils/reducer/reducer.utils";

// const addCartItem = (cartItems, ProductToAdd) => {
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === ProductToAdd.id
//   );
//   if (existingCartItem) {
//     return cartItems.map(
//       (cartItem) =>
//         cartItem.id === ProductToAdd.id
//           ? { ...cartItem, quantity: cartItem.quantity + 1 }
//           : cartItem //
//     );
//   }
//   return [...cartItems, { ...ProductToAdd, quantity: 1 }];
// };

// const removeCartItem = (cartItems, CartItemToRemove) => {
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === CartItemToRemove.id
//   );
//   if (existingCartItem.quantity === 1) {
//     return cartItems.filter((cartItem) => cartItem.id !== CartItemToRemove.id);
//   }
//   return cartItems.map(
//     (cartItem) =>
//       cartItem.id === CartItemToRemove.id
//         ? { ...cartItem, quantity: cartItem.quantity - 1 }
//         : cartItem //
//   );
// };

// const clearCartItem = (cartItems, CartItemToClear) => {
//   return cartItems.filter((cartItem) => cartItem.id !== CartItemToClear.id);
// };

// export const CartContext = createContext({
//   //   isCartOpen: false,
//   //   setIsCartOpen: () => {},
//   //   cartItems: [],
//   addItemToCart: () => {},
//   removeItemToCart: () => {},
//   clearCartItem: () => {},
//   //   cartCount: 0,
//   //   cartTotal: 0,
// });

// const CART_ACTION_TYPES = {
//   SET_CART_ITEMS: "SET_CART_ITEMS",
//   SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
// };

// const INITIAL_STATE = {
//   cartCount: 0,
//   cartTotal: 0,
//   cartItems: [],
//   isCartOpen: false,
// };

// const CartReducer = (state, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case CART_ACTION_TYPES.SET_CART_ITEMS:
//       return {
//         ...state,
//         ...payload,
//       };
//     case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//       return {
//         ...state,
//         isCartOpen: payload,
//       };
//     default:
//       throw new Error(`Unhandled type ${type} in cartReducer`);
//   }
// };

// export const CartProvider = ({ children }) => {
//   const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] =
//     useReducer(CartReducer, INITIAL_STATE);

//   const updateCartItemsReducer = (newCartItems) => {
//     const newCartCount = newCartItems.reduce(
//       (total, cartItem) => total + cartItem.quantity,
//       0
//     );
//     const newCartTotal = newCartItems.reduce(
//       (total, cartItem) => total + cartItem.quantity * cartItem.price,
//       0
//     );

//     dispatch(
//       createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
//         cartItems: newCartItems,
//         cartCount: newCartCount,
//         cartTotal: newCartTotal,
//       })
//     );
//   };

//   const addItemToCart = (ProductToAdd) => {
//     const newCartItems = addCartItem(cartItems, ProductToAdd);
//     updateCartItemsReducer(newCartItems);
//   };

//   const removeItemToCart = (CartItemToRemove) => {
//     const newCartItems = removeCartItem(cartItems, CartItemToRemove);
//     updateCartItemsReducer(newCartItems);
//   };

//   const clearItemFromCart = (CartItemToRemove) => {
//     const newCartItems = clearCartItem(cartItems, CartItemToRemove);
//     updateCartItemsReducer(newCartItems);
//   };

//   const setIsCartOpen = (boolean) => {
//     dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));
//   };

//   const value = {
//     isCartOpen,
//     setIsCartOpen,
//     addItemToCart,
//     removeItemToCart,
//     clearItemFromCart,
//     cartItems,
//     cartCount,
//     cartTotal,
//   };
//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };
