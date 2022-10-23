import { useContext, React } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ CartItem }) => {
  const { addItemToCart, removeItemToCart, clearItemFromCart } =
    useContext(CartContext);
  const { name, imageUrl, price, quantity } = CartItem;
  const clearItemHandler = () => clearItemFromCart(CartItem);
  const addItemHandler = () => addItemToCart(CartItem);
  const removeItemHandler = () => removeItemToCart(CartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div onClick={clearItemHandler}>&#10005;</div>
    </div>
  );
};

export default CheckoutItem;
