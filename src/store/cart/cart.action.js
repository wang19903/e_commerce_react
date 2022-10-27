import { CART_ACTION_TYPES } from "./cart.type";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setCart = (user) => {
  console.log("action", user);
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, user);
};
