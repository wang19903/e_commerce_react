import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  addItemToCart,
  removeItemToCart,
  clearItemFromCart,
} from "../../store/cart/cart.action";
import {
  CheckoutItemContainer,
  ImageContainer,
  SpanStyle,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles";

const CheckoutItem = ({ CartItem }) => {
  const { name, imageUrl, price, quantity } = CartItem;
  const dispatch = useDispatch();
  const carItems = useSelector(selectCartItems);
  const addItemHandler = () => dispatch(addItemToCart(carItems, CartItem));
  const removeItemHandler = () =>
    dispatch(removeItemToCart(carItems, CartItem));
  const clearItemHandler = () =>
    dispatch(clearItemFromCart(carItems, CartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <SpanStyle>{name}</SpanStyle>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <SpanStyle>{price}</SpanStyle>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
