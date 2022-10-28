import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";
import Button from "../button/button.component";
import CartItem from "../crat-item/cart-item.component";

const CartDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartItems = useSelector(selectCartItems);

  const goToCheckHandler = () => {
    dispatch(setIsCartOpen(!isCartOpen));
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => {
            return <CartItem key={item.id} CartItem={item} />;
          })
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>

      <Button onClick={goToCheckHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
