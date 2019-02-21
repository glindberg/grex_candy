import React, { Component } from "react";
// import { Switch, Route, Link } from "react-router-dom";
import { compose } from "recompose";
import { AuthUserContext, withAuthorization } from "../Session";
<<<<<<< HEAD
import { TxtContainer } from "../Profile/styles";
import { withFirebase } from "../Firebase";
import { Messages } from "../Chat";

=======
import { Wrapper, TxtContainer } from "../Profile/styles";
import { withFirebase } from "../Firebase";
import { Messages } from "../Chat";

// import * as ROLES from "../../constants/roles";
// import * as ROUTES from "../../constants/routes";
import Activity from "../Activity";

// const ActivityContent = () => (
//   <div>
//     <h1>Activity Content</h1>
//     <p>Detailed info about selected activity, {Activity.uid}</p>
//   </div>
// );

const ActivitiyContent = ({ activity, hideActivity }) => (
  <Wrapper>
    <AuthUserContext.Consumer>
      {authUser => (
        <div className="profile">
          <h1>Profile</h1>
          <ul />
          <Activities userId={authUser.uid} />
          <p />
        </div>
      )}
    </AuthUserContext.Consumer>
  </Wrapper>
);

>>>>>>> b8ca6c9881398e5f7a99d2fdbae8dc4b7b8d560c
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
<<<<<<< HEAD
=======
    //     this.setState({ loading: true });

    //     this.props.firebase
    //       .activity(this.props.activity.uid)
    //       .on("value", snapshot => {
    //         this.setState({
    //           ...snapshot.val(),
    //           loading: false
    //         });
    //       });
>>>>>>> b8ca6c9881398e5f7a99d2fdbae8dc4b7b8d560c
  }
  componentWillUnmount() {
    this.props.firebase.activities().off();
  }

  render() {
    const { loading } = this.state;

<<<<<<< HEAD
    const { activity, hideActivity } = this.props;
=======
    const { activity, userId, hideActivity } = this.props;
>>>>>>> b8ca6c9881398e5f7a99d2fdbae8dc4b7b8d560c
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
                      <strong>CLOSE</strong>
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

<<<<<<< HEAD
=======
const Activities = withFirebase(ActivityContent);

>>>>>>> b8ca6c9881398e5f7a99d2fdbae8dc4b7b8d560c
const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withFirebase
)(ActivityContent);
