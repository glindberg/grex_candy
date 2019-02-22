import React from "react";
import Activities from "../Activity/activity";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const ActivityPage = () => (
  <div>
    <h1>Activity</h1>
    <div>
      <Activities />

      <Link to={ROUTES.CREATE_ACTIVITY}>Create Activity</Link>
    </div>
  </div>
);

export default ActivityPage;
