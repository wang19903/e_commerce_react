import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal
} from "../../store/cart/cart.selector";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentFrom from "../../components/payment-from/payment-from.component";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total
} from "./checkout.styles";

const Checkout = () => {
  const cartTotal = useSelector(selectCartTotal);
  const cartItems = useSelector(selectCartItems);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => {
        return <CheckoutItem key={cartItem.id} CartItem={cartItem} />;
      })}
      <Total className="total">Total: {cartTotal}</Total>
      <PaymentFrom />
    </CheckoutContainer>
  );
};

export default Checkout;
