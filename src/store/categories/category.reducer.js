import { CATEGORY_ACTION_TYPES } from "./category.type";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategoriesMap } from "./category.action";
export const CATEGORIES_INITIAL_STATE = {
  categoriesMap: {},
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;

  const getCategoriesMap = async () => {
    const categoryMap = await getCategoriesAndDocuments();
    setCategoriesMap(categoryMap);
  };
  getCategoriesMap();

  switch (type) {
    case CATEGORY_ACTION_TYPES.SET_CATEGORIES_MAP:
      return { ...state, categoriesMap: payload };
    default:
      return state;
  }
};
