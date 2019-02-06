import React from "react";
import { styled, LandingP, Flex } from "./styles";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import Navigation from "../Navigation/index";

const App = () => (
  <LandingP>
    <Flex>
      <h1>Welcome to Grex</h1>
      <p>
        While having drinks with Tibor Kalman one night, he told me, “When you
        make something no one hates, no one fucking loves it.” Never, never assume
        that what you have achieved is fucking good enough. Think about all the
        fucking possibilities. Think about all the fucking possibilities. Why are
        you fucking reading all of this? Get back to work.
      </p>
      <p>Join us now!</p>
    </Flex>
  </LandingP>
);

export default App;
