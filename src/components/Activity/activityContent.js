import React, { Component } from "react";
// import { Switch, Route, Link } from "react-router-dom";
import { compose } from "recompose";
import { AuthUserContext, withAuthorization } from "../Session";
import { TxtContainer } from "../Profile/styles";
import { withFirebase } from "../Firebase";
import MessagesTwo from "../Chat";

class ActivityContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: null,
      showChat: false
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

  displayChat() {
    this.setState({ showChat: true });
    console.log("showChat har kallats på");
  }

  hideChat = () => {
    this.setState({ showChat: false });
  };

  render() {
    const { loading, showChat } = this.state;

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
                    <b>Type of activity: </b>
                    {activity.activity}
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
                    <b>Created at: </b>
                    <Time createdAt={activity.createdAt} />
                  </li>

                  <li>
                    <span onClick={() => hideActivity()}>
                      <button>
                        <strong>CLOSE</strong>
                      </button>
                    </span>
                  </li>
                  <br />
                  <li>
                    {!showChat && (
                      <span onClick={() => this.displayChat()}>
                        <button>
                          <strong>Join Activity</strong>
                        </button>
                      </span>
                    )}
                  </li>

                  {showChat && (
                    <div>
                      <MessagesTwo
                        activity={activity}
                        users={this.state.users}
                      />
                      <button onClick={this.hideChat}>Leave Activity</button>
                    </div>
                  )}

                  <br />
                </TxtContainer>
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

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withFirebase
)(ActivityContent);

export { Time };
