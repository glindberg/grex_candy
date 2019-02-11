import styled from 'styled-components';

export const Nav = styled.section`
  height: 60px;
  background-color: green;
  display: flex;

  h1 {
    color: white;
    margin: auto;
  }
`;

export const NonAuth = styled.ul`
  list-style: none;
  display: flex;
  margin-top: 0;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 0;


  button {
    margin: 1em;
    font-size: 0.8em;
    padding: 0.65em;
    border-radius: 8%;
    width: 6em;
    margin-bottom: 2em;

    a {
      text-decoration: none;
      color: rgb(20, 61, 32);
    }




  }
`;