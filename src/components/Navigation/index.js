import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import Example from './hamburger';
import { Nav, NonAuth } from "./styles";



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
      <button><Link to={ROUTES.SIGN_IN}>Sign In</Link></button>
    </li>
    <li>
      <button><Link to={ROUTES.SIGN_UP}>Sign Up</Link></button>
    </li>
  </NonAuth>
);

export default Navigation;
