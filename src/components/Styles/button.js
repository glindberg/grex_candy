import styled from "styled-components";

export const Button = styled.button`
  border: none;
  color: white;
  font-size: 1em;
  border-radius: 5px;
  padding-right: 10px;
  margin: 5px;
  background: #232526; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #414345,
    #232526
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #414345,
    #232526
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  a {
    text-decoration: none;
    color: white;
  }
`;