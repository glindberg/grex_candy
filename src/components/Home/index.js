import React from "react";
import LocationPage from "../Map/location";
import { AuthUserContext } from "../Session";
const Home = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <LocationPage userId={authUser.uid} />
      </div>
    )}
  </AuthUserContext.Consumer>
);

export default Home;
