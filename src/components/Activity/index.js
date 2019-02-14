import React from "react";

import { Activities } from "../Home";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const Activity = () => (
  <div>
    <h1>Activity</h1>
    <div>
      <p>hello</p>
      <Activities />
      <Link to={ROUTES.CREATE_ACTIVITY}>Create Activity</Link>
    </div>
  </div>
);

export default Activity;
