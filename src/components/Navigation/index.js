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

const NonAuth = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  margin-top: 0;
  li {
    margin-right: 1em;
    margin-top: 1em;
    font-size: 0.8em;
    a {
      text-decoration: none;
      color: rgb(248, 249, 247);
    }
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
  <NonAuth>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </NonAuth>
);

export default Navigation;
