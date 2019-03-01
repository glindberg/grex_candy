import React from "react";
import Activities from "../Activity/activity";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { ActPage } from "./styles";

const ActivityPage = () => (
  <ActPage>
    <h1>Activities</h1>
    <div>
      <Activities />
    </div>
  </ActPage>
);

export default ActivityPage;
