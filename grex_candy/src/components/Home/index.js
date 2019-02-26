import React from "react";
import LocationPage from "../Map/location";
import { AuthUserContext } from "../Session";
import ActivityPage from "../Activity/index";
import { HomePage } from "./styles";

const Home = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <HomePage>
        <LocationPage userId={authUser.uid} />
        <ActivityPage />
      </HomePage>
    )}
  </AuthUserContext.Consumer>
);

export default Home;
