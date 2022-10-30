import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles";
import { useDispatch, useSelector } from "react-redux";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { name, imageUrl, price } = product;
  const carItems = useSelector(selectCartItems);
  const addProductToCart = () => dispatch(addItemToCart(carItems, product));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to card
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
