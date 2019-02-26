import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import Example from "./hamburger";
import { Nav, NonAuth } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = ({ authUser }) => (
  <Nav>
    <Example authUser={authUser} />
    <h1>GREX</h1>

    <Link to={ROUTES.CREATE_ACTIVITY}>
      <FontAwesomeIcon icon={["fas", "plus"]} />
    </Link>
  </Nav>
);

const NavigationNonAuth = () => (
  <NonAuth>
    <li>
      <button>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </button>
    </li>
    <li>
      <button>
        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </button>
    </li>
  </NonAuth>
);

export default Navigation;
