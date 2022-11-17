import { useState } from "react";
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  Elements,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  PaymentFormContainer,
  PaymentForm,
  PaymentButton
} from "./payment-from.styles";

const PaymentFrom = () => {
  const stripe = useStripe(); //make req
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isloading, setIsloading] = useState(null);

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsloading(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Countent-Type": "application/json"
      },
      body: JSON.stringify({ amount: amount * 100 })
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret }
    } = response;

    console.log(client_secret);

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest"
        }
      }
    });

    setIsloading(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("payment success");
      }
    }
  };

  return (
    <PaymentFormContainer>
      <PaymentForm onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement></CardElement>

        <PaymentButton
          isloading={isloading}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay now
        </PaymentButton>
      </PaymentForm>
    </PaymentFormContainer>
  );
};

export default PaymentFrom;
