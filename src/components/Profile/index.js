import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { Wrapper } from "./styles";
import ImageToProfile from "./profileImage";
// import Chat from "../Chat";

const ProfilePage = () => (
  <Wrapper>
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h1>Profile</h1>
          <ImageToProfile />
          <ul>
            <li>
              <b>Username: </b>
              {authUser.username}
            </li>
            <li>
              <b>Email: </b>
              {authUser.email}
            </li>
          </ul>
          <Profiles userId={authUser.uid} />
          <p>
            <button>
              <Link to={ROUTES.CREATE_PROFILE}>Edit profile</Link>
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
      users: []
    };
  }
  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        users: usersList,
        loading: false
      });
    });
  }
  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    const { userId } = this.props;
    return (
      <div>
        {loading && <div>Loading profile info...</div>}
        <ul>
          {users
            .filter(profile => profile.userId === userId)
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
                {/* <span><strong>ID:</strong> {profile.userId}</span>
                <br />
                <span>
                  <strong>ProfileID:</strong>
                  {profile.uid}
                </span>
                <br /> */}
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
