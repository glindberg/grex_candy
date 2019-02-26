import React, { Component } from "react";
// import { Switch, Route, Link } from "react-router-dom";
import { compose } from "recompose";
import { AuthUserContext, withAuthorization } from "../Session";

import { withFirebase } from "../Firebase";

class ShowTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: []
    };
  }
  componentDidMount() {
    this.setState({ loading: false });
  }
  componentWillUnmount() {
    this.props.firebase.activities().off();
  }

  render() {
    const { activity } = this.props;

    const time = () => {
      const showTime = new Date(activity.createdAt);
      var options = {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      };
      return showTime.toLocaleString("se-EN", options);
    };
    return (
      <li>
        <b>Created at: </b>
        {console.log(time)}
      </li>
    );
  }
}

const Time = withFirebase(ShowTime);

export default Time;
