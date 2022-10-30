import { USER_ACTION_TYPES } from "./user.type";

export const INITIAL_STATE = {
  currentUser: null,
  //saga pratice
  isLoading: false,
  error: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    //saga pratice
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return { ...state, currentUser: payload };
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
      return { ...state, error: payload };
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null };
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    default:
      return state;
  }
};
