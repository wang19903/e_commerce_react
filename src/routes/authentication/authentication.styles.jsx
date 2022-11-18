import styled from "styled-components";

export const AuthenticationContainer = styled.div`
  display: flex;
  max-width: 900px;
  justify-content: space-between;
  // display: grid;
  // grid-template-columns: repeat(2, 1fr);
  // gap: 20px;
  margin: auto;
  @media (max-width: 750px) {
    // grid-template-columns: repeat(1, 1fr);
    align-items: center;
    flex-direction: column;
  }
`;
