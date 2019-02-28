import React from "react";
import Activities from "../Activity/activity";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { ActPage } from "./styles";

const ActivityPage = () => (
  <ActPage>
    <div>
      <Activities />
      <Link to={ROUTES.CREATE_ACTIVITY}>Create Activity</Link>
    </div>
  </ActPage>
);

export default ActivityPage;
