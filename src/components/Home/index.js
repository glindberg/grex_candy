import React from "react";
import LocationPage from "../Map/location";
import { AuthUserContext } from "../Session";
import ActivityPage from "../Activity/index";
import { HomePage } from "./styles";
import { RedKeyboardArrowUp } from "styles/icons";

const Home = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <HomePage>
        <LocationPage userId={authUser.uid} />
        <RedKeyboardArrowUp />
        <ActivityPage />
      </HomePage>
    )}
  </AuthUserContext.Consumer>
);

export default Home;
