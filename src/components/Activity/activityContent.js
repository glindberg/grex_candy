import React, { Component } from "react";
// import { Switch, Route, Link } from "react-router-dom";
import { compose } from "recompose";
import { AuthUserContext, withAuthorization } from "../Session";
import { TxtContainer } from "../Profile/styles";
import { withFirebase } from "../Firebase";
import MessagesTwo from "../Chat";
import {
  ShowActivity,
  ActivityLi,
  ButtonsAct,
  ButtonDivs,
  ButtonClosing
} from "./styles";
import { CloseAct, ChatIcon, Trash } from "../Styles/icons";

class ActivityContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: null,
      showChat: false,
      hideActivity: false
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

  displayChat = () => {
    this.setState({ showChat: true });
  };
  hideChat = () => {
    this.setState({ showChat: false });
  };

  render() {
    const { loading, showChat, showMap } = this.state;

    const { activity, hideActivity } = this.props;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
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

                    <ButtonDivs>
                      <ButtonsAct
                        onClick={() => {
                          this.displayChat();
                        }}
                      >
                        <ChatIcon />
                        <span> | </span>Chat
                      </ButtonsAct>

                      <ButtonsAct onClick={() => hideActivity()}>
                        <Trash />
                        <span> | </span>Delete
                      </ButtonsAct>
                    </ButtonDivs>
                    {activity.userId === authUser.uid ? (
                      <li>
                        <span>
                          <button>
                            <strong>Remove Activity</strong>
                          </button>
                        </span>
                      </li>
                    ) : null}
                    <br />
                  </TxtContainer>
                )}
                {showChat && (
                  <div>
                    <button
                      onClick={() => {
                        this.hideChat(showMap);
                      }}
                    >
                      Close Chat
                    </button>
                    <MessagesTwo activity={activity} users={this.state.users} />
                  </div>
                )}
              </ShowActivity>
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
