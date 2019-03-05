import styled from "styled-components";

export const Wrapper = styled.div`
  .profile {
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
    width: 96%;
    border-radius: 10px;
    margin: 2% 1.8%;
    border: 1px solid black;
    position: absolute;
  }
  img {
    width: 200px;
    height: 200px;
  }
  h1 {
    text-align: center;
    margin: auto;
  }
`;

export const CreateP = styled.div`
  display: flex;

  div {
    width: 80%;
    margin: auto;
  }
  h1 {
    text-align: center;
  }
  label {
  }
  input {
    margin-left: 10px;
    border: none;
    border-bottom: 1px solid grey;
    position: fixed;
    right: 10%;
    padding-left: 5px;
  }
  select {
    width: 174px;
    position: fixed;
    right: 10%;
  }
  textarea {
    width: calc(100% - 6px);
    padding-left: 5px;
    margin-top: 10px;
  }
`;

export const ImgContainer = styled.div`
  text-align: center;
  margin: 10px 0px;
`;

export const TxtContainer = styled.div`
  width: 80%;
  margin: auto;
  font-size: 1.3em;
`;
export const BtnContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

export const OtherP = styled.div`
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

  height: 100%;
  width: 80%;
  border-radius: 20px;
  border: 1px solid black;
  margin: auto;
  p {
    margin-bottom: 20px;
  }
  ul {
    list-style: none;
  }
  img {
    height: 200px;
  }
`;
