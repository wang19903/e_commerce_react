import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { PaymentFormContainer, PaymentForm } from "./payment-from.styles";

const PaymentFrom = () => {
  const stripe = useStripe(); //make req
  const elements = useElements();
  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Countent-Type": "application/json"
      },
      body: JSON.stringify({ amount: 10000 })
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret }
    } = response;

    console.log(client_secret);

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "testName"
        }
      }
    });
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
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
      </PaymentForm>
    </PaymentFormContainer>
  );
};

export default PaymentFrom;
