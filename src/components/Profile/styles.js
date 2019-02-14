import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: beige;
  width: 100%;
  margin-top: 15px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px black solid;
  }

  h1 {
    text-align: center;
    margin: auto;
  }
  ul {
    list-style: none;
    margin: 0;
    li {
    }
  }
`;

export const Image = styled.div`
  .female {
    display: none;
  }
  .male {
    display: none;
  }
  .other {
    /* display: none; */
  }
`;
