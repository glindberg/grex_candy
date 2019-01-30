import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import styled from 'styled-components';
import Example from './hamburger';

const Nav = styled.section`
  height: 60px;
  background-color: green;
  display: flex;
  h1{
    color: white;
    margin: auto;
  }
`;

 


const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <Nav>
      <Example />
      <h1>GREX</h1>
  </Nav>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
