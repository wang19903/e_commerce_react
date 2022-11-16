import { CategoryItem } from "../categories/category.type";
import { CART_ACTION_TYPES, CartItem } from "./cart.type";
import {
  createAction,
  withMatcher,
  ActionWithPayload
} from "../../utils/reducer/reducer.utils";

const addCartItem = (
  cartItems: CartItem[],
  ProductToAdd: CategoryItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem: CartItem) => cartItem.id === ProductToAdd.id
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

const removeCartItem = (
  cartItems: CartItem[],
  CartItemToRemove: CategoryItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === CartItemToRemove.id
  );
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== CartItemToRemove.id);
  }
  return cartItems.map(
    (cartItem) =>
      cartItem.id === CartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem //
  );
};

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>; //

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const clearCartItem = (
  cartItems: CartItem[],
  CartItemToClear: CartItem
): CartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== CartItemToClear.id);
};

export const setIsCartOpen = withMatcher(
  (boolean: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
);

export const addItemToCart = (
  cartItems: CartItem[],
  ProductToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, ProductToAdd);
  return setCartItems(newCartItems);
};

export const removeItemToCart = (
  cartItems: CartItem[],
  CartItemToRemove: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, CartItemToRemove);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  CartItemToRemove: CartItem
) => {
  const newCartItems = clearCartItem(cartItems, CartItemToRemove);
  return setCartItems(newCartItems);
};
