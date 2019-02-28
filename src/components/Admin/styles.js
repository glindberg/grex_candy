import styled from "styled-components";

export const Admin = styled.div`
  background: #abbaab; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #ffffff,
    #abbaab
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #ffffff,
    #abbaab
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  border: 1px solid black;
  border-radius: 5px;
  height: 100%;
  margin: 5px;
  color: black;

  div {
    margin-left: 20%;
    padding-top: 10px;
    padding-bottom: 10px;
    h2 {
      margin: 0px;
      padding: 0;
    }
    a {
      color: black;
      text-decoration: none;
    }
  }
`;
