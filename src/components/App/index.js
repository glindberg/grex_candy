import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import ProfilePage from "../Profile";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";
import createProfile from "../Profile/createProfile";
import createActivity from "../Activity/createActivity";
import ActivityPage from "../Activity/index";
import ActivityContent from "../Activity/activityContent";
import Chat from "../Chat/index";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faPlus);

const App = () => (
  <Router>
    <div>
      <Navigation />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PROFILE} component={ProfilePage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.CREATE_PROFILE} component={createProfile} />
      <Route path={ROUTES.CREATE_ACTIVITY} component={createActivity} />
      <Route path={ROUTES.ACTIVITY} component={ActivityPage} />
      <Route path={ROUTES.ACTIVITY_CONTENT} component={ActivityContent} />
      {/* <Route path={ROUTES.CHAT} component={Chat} /> */}
    </div>
  </Router>
);

export default withAuthentication(App);
