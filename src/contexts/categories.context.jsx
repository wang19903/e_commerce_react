//note
// import { createContext, useState, useEffect } from "react";
// import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
// //import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";
// // import SHOP_DATA from "../shop-data.js"; //set in firebase

// export const CategoriesContext = createContext({
//   categoriesMap: {},
// });

// export const CategoriesProvider = ({ children }) => {
//   const [categoriesMap, setCategoriesMap] = useState({});

//   // useEffect(() => {
//   //   addCollectionAndDocuments("categories", SHOP_DATA);
//   // }, []); //set in firebase

//   useEffect(() => {
//     const getCategoriesMap = async () => {
//       const categoryMap = await getCategoriesAndDocuments();
//       //   console.log(categoryMap);
//       setCategoriesMap(categoryMap);
//     };
//     getCategoriesMap();
//   }, []);

//   const value = { categoriesMap };
//   return (
//     <CategoriesContext.Provider value={value}>
//       {children}
//     </CategoriesContext.Provider>
//   );
// };
