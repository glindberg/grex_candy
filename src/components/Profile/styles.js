import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: beige;
  width: 100%;
  height: 100%;

  .profile {
    background: linear-gradient(rgb(207, 226, 199), rgb(118, 135, 110));
    width: 80%;
    margin: auto;
    border: 1px solid black;
    border-radius: 10px;
    margin-top: 15px;
    -webkit-box-shadow: 5px 5px 15px 5px #000000a8;
    box-shadow: 5px 5px 15px 5px #000000af;
    ul {
      margin: 0;
      padding: 0;
    }
  }
  div {
    margin: auto;
  }
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
    padding: 0;
    li {
    }
  }
`;

export const Image = styled.div`
  .female {
    /* display: none; */
  }
  .male {
    /* display: none; */
  }
  .other {
    /* display: none; */
  }
`;
