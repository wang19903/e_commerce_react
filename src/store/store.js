import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action) {
    return next;
  }
  console.log("action", action);
  console.log("store", store);
  console.log("store", store.getState());
  next(action);
  console.log("next", store.getState());
};
const middleware = [loggerMiddleware];
const composedEnhancers = compose(applyMiddleware(...middleware));

export const store = createStore(rootReducer, undefined, composedEnhancers);
