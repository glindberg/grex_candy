import React from "react";

import { withFirebase } from "../Firebase";
import { ByeBye } from "../Styles/icons";

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut}>
    <ByeBye />
    <span> | </span>Sign Out
  </button>
);

export default withFirebase(SignOutButton);
