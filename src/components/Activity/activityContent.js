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
  ButtonClosing,
  ActivityBig,
  ActivityDiv
} from "./styles";
import { CloseAct, ChatIcon, Trash } from "../Styles/icons";
import { Button } from "../Styles/button";

class ActivityContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: null,
      showChat: false,
      showMap: false,
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
  hideMap = () => {
    this.setState({ showMap: false });
    console.log("nya hideMap har kallats på");
  };

  render() {
    const { loading, showChat, showMap } = this.state;

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
                    {!showMap && (
                      <span
                        onClick={() => {
                          this.displayChat();
                        }}
                      >
                        <Button>
                          <ChatIcon />
                          <span> | </span>Chat
                        </Button>
                      </span>
                    )}

                    {activity.userId === authUser.uid ? (
                      <li>
                        <span onClick={() => removeActivity()}>
                          <Button>
                            <Trash />
                            <span> | </span>Delete
                          </Button>
                        </span>
                      </li>
                    ) : null}
                  </ButtonDivs>

                  <br />

                  {/* <MessagesTwo activity={activity} users={this.state.users} /> */}

                  {/* <li>
                    {!showMap && (
                      <span
                        onClick={() => {
                          this.displayChat();
                        }}
                      >
                        <button>
                          <strong>Chat</strong>
                        </button>
                      </span>
                    )}
                  </li> */}

                  <br />
                </TxtContainer>

                {showChat && (
                  <div>
                    <MessagesTwo activity={activity} users={this.state.users} />
                    <Button
                      onClick={() => {
                        this.hideChat();
                      }}
                    >
                      Hide Chat
                    </Button>
                  </div>
                )}
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
