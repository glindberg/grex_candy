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
    position: fixed;
    left: 10%;
    top: 65px;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
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
`;

export const ImgContainer = styled.div`
  text-align: center;
`;

export const TxtContainer = styled.div`
  padding-left: 20%;
`;
