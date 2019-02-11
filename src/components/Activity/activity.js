import React from "react";

import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import { compose } from "recompose";

import {
    AuthUserContext,
    withAuthorization
} from "../Session";

import { withFirebase } from "../Firebase";

import { Activities } from "../Home"

const Activity = () => (
    <div>
        <h1>Activity</h1>
        <div>
            <p>hello</p>
            <Activities />
        </div>
    </div>
);

export default Activity;