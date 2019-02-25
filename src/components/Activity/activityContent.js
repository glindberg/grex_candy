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
                    <span onClick={() => hideActivity()}>
                      <strong>CLOSE</strong>
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

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withFirebase
)(ActivityContent);
