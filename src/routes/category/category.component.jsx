import { useParams } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoryContainer, CategoryTitle } from "./category.styles";
import { selectCategoriesMap } from "../../store/categories/category.selector";

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState(categoriesMap[category]);
  const categoriesMap = useSelector(selectCategoriesMap);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
