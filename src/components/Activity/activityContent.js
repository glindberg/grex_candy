import React, { Component } from "react";
// import { Switch, Route, Link } from "react-router-dom";
import { compose } from "recompose";
import { AuthUserContext, withAuthorization } from "../Session";
import { TxtContainer } from "../Profile/styles";
import { withFirebase } from "../Firebase";
import MessagesTwo from "../Chat";
import {
  ShowActivity,
  ActivityDiv,
  ActivityLi,
  ButtonsAct,
  ButtonDivs,
  ButtonClosing,
  ActivityBig
} from "./styles";
import { Button } from "../Styles/button";
import { Run, CloseAct, ChatIcon, Trash } from "../Styles/icons";

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

  render() {
    const { loading } = this.state;

    const { activity, hideActivity, removeActivity } = this.props;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <ActivityDiv>
            {loading && <div>Loading info...</div>}
            {loading ? null : (
              <ShowActivity>
                <TxtContainer>
                  <span onClick={() => hideActivity()}>
                    <ButtonClosing>
                      <CloseAct />
                      {/* <span> | </span>Home */}
                    </ButtonClosing>
                  </span>
                  <br />
                  <ActivityLi>
                    <ActivityBig>
                      {/* <strong>Activity: </strong> */}
                      {activity.activityname}
                    </ActivityBig>
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
                      <b>Created: </b>
                      <Time createdAt={activity.createdAt} />
                    </li>
                  </ActivityLi>

                  <ButtonDivs>
                    <ButtonsAct>
                      <ChatIcon />
                      <span> | </span>Chat
                    </ButtonsAct>

                    {activity.userId === authUser.uid ? (
                      <span onClick={() => removeActivity()}>
                        <ButtonsAct>
                          <Trash />
                          <span> | </span>Delete
                        </ButtonsAct>
                      </span>
                    ) : null}
                  </ButtonDivs>

                  <br />
                </TxtContainer>
                <MessagesTwo activity={activity} users={this.state.users} />
              </ShowActivity>
            )}
          </ActivityDiv>
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
