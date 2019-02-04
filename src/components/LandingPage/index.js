import React from "react";
import { styled, LandingP, Flex } from "./styles";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import Navigation from "../Navigation/index";


const Welcome = () => (
  <LandingP>
    <Navigation />
    <Flex>
      <h1>Grex</h1>
      <p>
        While having drinks with Tibor Kalman one night, he told me, “When you
        make something no one hates, no one fucking loves it.” Never, never assume
        that what you have achieved is fucking good enough. Think about all the
        fucking possibilities. Think about all the fucking possibilities. Why are
        you fucking reading all of this? Get back to work.
    </p>
      <button>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </button>
      <button>
        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </button>
    </Flex>
  </LandingP>
);

export default Welcome;
