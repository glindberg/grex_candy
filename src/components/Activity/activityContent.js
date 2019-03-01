import React, { Component } from "react";
// import { Switch, Route, Link } from "react-router-dom";
import { compose } from "recompose";
import { AuthUserContext, withAuthorization } from "../Session";
import { TxtContainer } from "../Profile/styles";
import { withFirebase } from "../Firebase";
import { MessagesTwo } from "../Chat";

class ActivityContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: null
    };
  }

  componentDidMount() {
    this.props.firebase.users().on("value", snapshot => {
      this.setState({
        loading: false,
        users: snapshot.val()
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.activities().off();
  }

  // time = () => {
  //   const showTime = new Date(this.props.activity.createdAt);
  //   const options = {
  //     weekday: "long",
  //     year: "numeric",
  //     month: "numeric",
  //     day: "numeric",
  //     hour: "numeric",
  //     minute: "numeric"
  //   };
  //   return showTime.toLocaleString("se-EN", options);
  // };

  render() {
    const { loading } = this.state;

    const { activity, hideActivity } = this.props;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {loading && <div>Loading info...</div>}
            {loading ? null : (
              <ul>
                <TxtContainer>
                  <br />
                  <li>
                    <b>Created at: </b>
                    <Time createdAt={activity.createdAt} />
                  </li>
                  <li>
                    <b>Activity: </b>
                    {activity.activityname}
                  </li>
                  <li>
                    <b>Type of activity: </b>
                    {activity.activity}
                  </li>
                  <li>
                    <b>Date: </b>
                    {activity.dateforact}
                  </li>
                  <li>
                    <b>Start time: </b>
                    {activity.actlengthstart}
                  </li>
                  <li>
                    <b>End time: </b>
                    {activity.actlengthend}
                  </li>
                  <li>
                    <b>Intensity: </b>
                    {activity.intensity}
                  </li>
                  <li>
                    <b>Details: </b>
                    {activity.details}
                  </li>
                  <li>
                    <b>Created by: </b>
                    {activity.members}
                  </li>

                  <li>
                    <span onClick={() => hideActivity()}>
                      <button>
                        <strong>CLOSE</strong>
                      </button>
                    </span>
                  </li>
                  <br />
                  {/* <button onClick={joinActivity()}>Join Activity</button>*/}
                </TxtContainer>
                {/*<Messages />*/}
                {/*<Messages users={this.state.users} />*/}
                <MessagesTwo activity={activity} users={this.state.users} />
              </ul>
            )}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const Time = activity => {
  const showTime = new Date(activity.createdAt);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };
  return showTime.toLocaleString("se-EN", options);
};

const ActivityChar = activity => {
  const characters = String(activity.activityname);
  // return characters.substring(characters.indexOf(0, 20));
  if (characters.length > 16) {
    return characters.substr(0, 15) + "...";
  } else {
    return characters;
  }
};

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withFirebase
)(ActivityContent);

export { Time, ActivityChar };
