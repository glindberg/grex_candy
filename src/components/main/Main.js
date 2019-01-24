import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from '../home/Home'
import Profile from '../profile/Profile';

const Main = () =>(
    <Switch>
        <Route  
            exact path="/"
            render={routeProps => <Home {...routeProps} /> }
        />
        <Route 
            exact path="/profile"
            render={routeProps => <Profile {...routeProps} />}
        />
    </Switch>
  )

  export default Main;