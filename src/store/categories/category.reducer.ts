import { AnyAction } from "redux";
import { CategoriesArray } from "./category.type";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesfailed
} from "./category.action";

export type CategoriesState = {
  readonly categories: CategoriesArray[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true };
  }
  if (fetchCategoriesSuccess.match(action)) {
    return { ...state, categories: action.payload, isLoading: false };
  }
  if (fetchCategoriesfailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;
};
