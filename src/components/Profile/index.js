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
        <div className="profile">
          <h1>Profile</h1>
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

    this.props.firebase.user(this.props.userId).on("value", snapshot => {
      // const usersObject = snapshot.val();

      // const usersList = Object.keys(usersObject).map(key => ({
      //   ...usersObject[key],
      //   userId: key
      // }));

      this.setState({
        ...snapshot.val(),
        loading: false
      });
    });
  }
  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const {
      loading,
      gender,
      fname,
      lname,
      age,
      phone,
      city,
      description
    } = this.state;

    const { userId } = this.props;
    return (
      <div>
        {loading && <div>Loading profile info...</div>}
        {loading ? null : (
          <ul>
            <li>
              <ImageToProfile gender={gender} />
              <span>
                <strong>Name: </strong> {fname} {lname}
                {userId.fname}
              </span>
              <br />
              <span>
                <strong>Gender: </strong> {gender}
              </span>
              <br />
              <span>
                <strong>Age:</strong> {age}
              </span>
              <br />
              <span>
                <strong>Phone: </strong>+46 {phone}
              </span>
              <br />
              <span>
                <strong>City:</strong> {city}
              </span>
              <br />
              <span>
                <strong>Description:</strong>
                <br /> {description}
              </span>
              <br />
              <br />
            </li>
          </ul>
        )}
      </div>
    );
  }
}

const Profiles = withFirebase(ProfileContent);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProfilePage);
