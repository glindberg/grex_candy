import React from "react";
import { AuthUserContext } from "../Session";
import ActivityPage from "../Activity/index";
import { HomePage } from "./styles";
import { withAuthorization } from "../Session";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";

const Home = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <HomePage>
        <ActivityPage />
      </HomePage>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition)
)(Home);
