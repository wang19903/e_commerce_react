import styled from "styled-components";
import Button from "../button/button.component";

export const PaymentFormContainer = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const PaymentForm = styled.form`
  height: 100px;
  min-width: 500px;
  :nth-child(1) {
    min-width: 30rem;
  }
  @media (max-width: 600px) {
    width: 100%;
    :nth-child(1) {
      min-width: 350px;
    }
  }
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;
`;
