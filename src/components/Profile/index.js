import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";

const ProfilePage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Profile </h1>
        <p>
          <b>Username: </b>
          {authUser.username}
        </p>
        <p>
          <b>Email: </b>
          {authUser.email}
        </p>

        <Profiles />
        <p>
          <button>
            <Link to={ROUTES.CREATE_PROFILE}>Create profile</Link>
          </button>
          <br />
          <Link to={ROUTES.ACCOUNT}>Change Password?</Link>
        </p>
      </div>
    )}
  </AuthUserContext.Consumer>
);

class ProfileContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      profiles: []
    };
  }
  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.profiles().on("value", snapshot => {
      const profilesObject = snapshot.val();

      const profilesList = Object.keys(profilesObject).map(key => ({
        ...profilesObject[key],
        uid: key
      }));

      this.setState({
        profiles: profilesList,
        loading: false
      });
    });
  }
  componentWillUnmount() {
    this.props.firebase.profiles().off();
  }
  render() {
    const { profiles, loading } = this.state;
    return (
      <div>
        <h2>Profile Info</h2>
        {loading && <div>Loading ...</div>}
        <ul>
          {profiles.map(profile => (
            <li key={profile.uid}>
              <span>
                <strong>Name: </strong> {profile.fname} {profile.lname}
              </span>
              <br />
              <span>
                <strong>Gender: </strong> {profile.gender}
              </span>
              <br />
              <span>
                <strong>Age:</strong> {profile.age}
              </span>
              <br />
              <span>
                <strong>Phone: </strong>+46 {profile.phone}
              </span>
              <br />
              <span>
                <strong>City:</strong> {profile.city}
              </span>
              <br />
              <span>
                <strong>Description:</strong> {profile.description}
              </span>
              <br />
              <br />
              <br />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const Profiles = withFirebase(ProfileContent);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProfilePage);
