import { useContext, React } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";
import Button from "../button/button.component";
import CartItem from "../crat-item/cart-item.component";
import { CartContext } from "../../contexts/cart.context";

const CartDropdown = () => {
  const { setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();
  //   const { cartItems } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);
  const goToCheckHandler = () => {
    setIsCartOpen(false);
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
