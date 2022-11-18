import styled from "styled-components";
import Button from "../button/button.component";

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  @media (max-width: 412px) {
    width: 100%;
  }
`;

export const H2 = styled.h2`
  margin: 10px 0;
`;

export const ButtonsContainer = styled.h2`
  display: flex;
  justify-content: space-between;
  @media (max-width: 900px) {
    button {
      padding: 0;
      min-width: 100px;
    }
  }
`;
export const GoogleButton = styled(Button)`
  @media (max-width: 900px) {
    width: 150px;
  }
`;
