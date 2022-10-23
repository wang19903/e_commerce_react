import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CartItem from "../crat-item/cart-item.component";
import { useContext, React } from "react";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  const { setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const goToCheckHandler = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => {
          return <CartItem key={item.id} CartItem={item} />;
        })}
      </div>

      <Button onClick={goToCheckHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
