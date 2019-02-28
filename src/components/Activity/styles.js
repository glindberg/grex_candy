import styled from "styled-components";

export const Act = styled.div`
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
  margin: 5px;
  font-size: 1.5rem;
  padding: 20px;
  border-radius: 10px;
`;

export const ActPage = styled.div`
  text-align: center;
  height: calc(100vh - 60px);
  h1 {
    margin: 0;
  }
`;