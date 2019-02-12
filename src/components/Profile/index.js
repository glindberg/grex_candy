import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { Wrapper } from "./styles";

const ProfilePage = () => (
  <Wrapper>
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <img
            className="profile"
            src={require(`../Images/man.png`)}
            alt="Profile of David Berg"
          />
          <h1>Profile </h1>
          <p>
            <b>Username: </b>
            {authUser.username}
          </p>
          <p>
            <b>Email: </b>
            {authUser.email}
          </p>
          <Profiles userId={authUser.uid} />
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
  </Wrapper>
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
    const { userId } = this.props;
    return (
      <div>
        <h3>Profile Info</h3>
        {loading && <div>Loading profile info...</div>}
        <ul>
          {profiles
            .filter(profile => profile.userId == userId)
            .map(profile => (
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
                <span>
                  <strong>ID:</strong> {profile.userId}
                </span>
                <br />
                <span>
                  <strong>ProfileID:</strong>
                  {profile.uid}
                </span>
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
