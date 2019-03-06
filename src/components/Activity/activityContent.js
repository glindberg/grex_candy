import React, { Component } from "react";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import { TxtContainer } from "../Profile/styles";
import { withFirebase } from "../Firebase";
import {
  ShowActivity,
  ActivityLi,
  ButtonClosing,
  ActivityDiv,
  ActivityBig
} from "./styles";
import { CloseX } from "../Styles/icons";

class ActivityContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    const { loading, showChat } = this.state;

    const { activity, hideActivity } = this.props;
    return (
      <ActivityDiv>
        {loading && <div>Loading info...</div>}
        {loading ? null : (
          <ShowActivity>
            {!showChat && (
              <TxtContainer>
                <span onClick={() => hideActivity()}>
                  <ButtonClosing>
                    <CloseX />
                  </ButtonClosing>
                </span>
                <br />
                <ActivityLi>
                  <ActivityBig>{activity.activityname}</ActivityBig>
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
              </TxtContainer>
            )}
          </ShowActivity>
        )}
      </ActivityDiv>
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
