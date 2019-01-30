import React from "react";

import { withAuthorization } from "../Session";
import styled from "styled-components";

const Home = styled.section`
`;

const HomePage = () => (
  <Home>
    <div>
      <h1>Home Page</h1>
      <p>The Home Page is accessible by every signed in user.</p>
    </div>
  </Home>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
