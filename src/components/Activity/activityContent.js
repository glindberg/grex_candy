import React, { Component } from "react";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import { TxtContainer } from "../Profile/styles";
import { withFirebase } from "../Firebase";
import { ShowActivity, ActivityLi, ButtonClosing } from "./styles";
import { CloseAct } from "../Styles/icons";

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
      <div>
        {loading && <div>Loading info...</div>}
        {loading ? null : (
          <ShowActivity>
            {!showChat && (
              <TxtContainer>
                <span onClick={() => hideActivity()}>
                  <ButtonClosing>
                    <CloseAct />
                  </ButtonClosing>
                </span>
                <br />
                <ActivityLi>
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
                    <b>Created: </b>
                    <Time createdAt={activity.createdAt} />
                  </li>
                </ActivityLi>
              </TxtContainer>
            )}
          </ShowActivity>
        )}
      </div>
      //   )}
      // </AuthUserContext.Consumer>
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
