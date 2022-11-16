import { AnyAction } from "redux";
import { CartItem } from "./cart.type";
import { setCartItems, setIsCartOpen } from "./cart.action";

export type CartState = {
  cartItems: CartItem[];
  isCartOpen: boolean;
};

export const CART_INITIAL_STATE = {
  cartItems: [],
  isCartOpen: false
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload
    };
  }
  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload
    };
  }

  return state;
};
