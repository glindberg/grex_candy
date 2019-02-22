import React from "react";
import LocationPage from "../Map/location";
import { AuthUserContext } from "../Session";

const Home = () => (
  <AuthUserContext>
    {authUser => (
      <div>
        <LocationPage />
      </div>
    )}
  </AuthUserContext>
);

export default Home;
