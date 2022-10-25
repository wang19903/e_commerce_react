import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles";
import ProductCard from "../product-card/product-card.component";
import React from "react";

const CategoryPreview = ({ title, products }) => {
  console.log(title, typeof title);
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title}</Title>
      </h2>
      <Preview>
        {products
          .filter((product, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
