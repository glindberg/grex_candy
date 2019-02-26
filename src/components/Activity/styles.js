import styled from "styled-components";

export const Act = styled.div`
  background: #3e5151; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #decba4,
    #3e5151
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #decba4,
    rgb(207, 226, 199)
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  margin: 5px;
  font-size: 2rem;
  color: white;
  padding: 20px;
  -webkit-box-shadow: 5px 5px 15px 5px green;
  box-shadow: 5px 5px 15px 5px grey;
  text-shadow: 2px 2px 2px black;
  border-radius: 10px;
`;

export const ActPage = styled.div`
  text-align: center;
  background: linear-gradient(rgb(207, 226, 199), rgb(118, 135, 110));
  h1 {
    margin: 0;
    color: white;
    text-shadow: 3px 3px 3px black;
  }
`;
