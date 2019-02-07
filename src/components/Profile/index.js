import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext, withAuthorization } from "../Session";

const ProfilePage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Profile </h1>
        <p>
          <b>Username: </b>
          {authUser.username}
        </p>
        <p>
          <b>Email: </b>
          {authUser.email}
        </p>
        <p>
          <b>Phone: </b>
          
        </p>
        <p>
          <b>Name:</b>
        </p>
        <p>
          <button><Link to={ROUTES.CREATE_PROFILE}>Create profile</Link></button>
          <br />
          <Link to={ROUTES.ACCOUNT}>Change Password?</Link>
        </p>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProfilePage);
