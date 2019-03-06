import styled from "styled-components";

export const Button = styled.button`
  background: #093028; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #237a57,
    #093028
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #237a57,
    #093028
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  border: none;
  color: white;
  border-radius: 5px;
  padding-right: 10px;
  margin: 5px;
  a {
    padding: 20px;
  }
  :disabled {
    background: rgba(255, 0, 0, 0.3);
  }
`;
