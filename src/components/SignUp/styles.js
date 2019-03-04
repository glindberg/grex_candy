import styled from "styled-components";

export const Register = styled.div`
  height: 100vh;
  background: linear-gradient(rgb(207, 226, 199), rgb(118, 135, 110));
  color: rgb(248, 249, 247);
  margin-bottom: 0;
  line-height: 1.4;
  text-align: center;
  display: flex;
  flex-direction: column;

  h1 {
    margin-top: 2.5em;
  }

  button {
    margin-top: 1em;
  }

  a {
    text-decoration: none;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormInput = styled.input`
  border-style: none;
  padding: 0.6em;
  margin: 0.8em;
  width: 60%;
`;

export const Btn = styled.button`
  font-size: 0.8em;
  padding: 0.4em;
  border-radius: 8%;
  width: 10em;
`;
