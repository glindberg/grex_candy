import React from "react";
import Chat from "../Chat/index";
import LocationPage from "../Map/location";
import { AuthUserContext } from "../Session";

const Home = () => (
  <AuthUserContext>
    {authUser => (
      <div>
        <LocationPage />
        <Chat />
      </div>
    )}
  </AuthUserContext>
);

export default Home;
