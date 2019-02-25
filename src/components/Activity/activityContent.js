import React, { Component } from "react";
// import { Switch, Route, Link } from "react-router-dom";
import { compose } from "recompose";
import { AuthUserContext, withAuthorization } from "../Session";
import { TxtContainer } from "../Profile/styles";
import { withFirebase } from "../Firebase";
import { Messages } from "../Chat";

class ActivityContent extends Component {
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
                    <b>Members: </b>
                    {activity.members}
                  </li>

                  <li>
                    <span onClick={() => hideActivity()}>
                      <button>
                        <strong>CLOSE</strong>
                      </button>
                    </span>
                  </li>
                </TxtContainer>
                {/* <Messages users={this.state.users} />*/}
                <Messages />
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
