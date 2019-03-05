import styled from "styled-components";

export const Button = styled.button`
  border: none;
  color: white;
  border-radius: 5px;
  padding-right: 10px;
  margin: 5px;
  background: rgb(83, 109, 122);

  a {
    padding: 20px;
  }
  :disabled {
    background: rgba(255, 0, 0, 0.3);
  }
`;
