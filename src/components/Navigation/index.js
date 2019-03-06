import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import Example from "./hamburger";
import { Nav, NonAuth, CreateAct, Ini } from "./styles";
import { NewActivity } from "../Styles/icons";
import { UserP } from "../Styles/icons";

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

const Initials = ({ authUser }) => {
  const fname = String(authUser.fname);
  const lname = String(authUser.lname);

  if (authUser.fname === "" && authUser.lname === "")
    return (
      <Ini>
        <span>
          <UserP />
        </span>
      </Ini>
    );
  else
    return (
      <Ini>
        <span>
          <strong>{fname.substr(0, 1)}</strong>
        </span>
        <span>
          <strong>{lname.substr(0, 1)}</strong>
        </span>
      </Ini>
    );
};

const NavigationAuth = ({ authUser }) => (
  <Nav>
    <Example authUser={authUser} />
    <h1>
      <Link to={ROUTES.HOME}>
        <strong>GREX</strong>
      </Link>
    </h1>

    <CreateAct>
      <Link to={ROUTES.CREATE_ACTIVITY}>
        <NewActivity />
      </Link>
      <Link to={ROUTES.PROFILE}>
        <Initials authUser={authUser} />
      </Link>
    </CreateAct>
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
