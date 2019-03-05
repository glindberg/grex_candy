import React from "react";

import { withFirebase } from "../Firebase";
import { ByeBye } from "../Styles/icons";
import { Button } from "../Styles/button";

const SignOutButton = ({ firebase }) => (
  <Button type="button" onClick={firebase.doSignOut}>
    <ByeBye />
    <span> | </span>Sign Out
  </Button>
);

export default withFirebase(SignOutButton);
