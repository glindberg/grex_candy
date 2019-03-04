import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { Wrapper, ImgContainer, TxtContainer, BtnContainer } from "./styles";
import ImageToProfile from "./profileImage";
import { Button } from "../Styles/button";
import { Edi, Key } from "../Styles/icons";

const ProfilePage = () => (
  <AuthUserContext.Consumer>
    {authUser => <Profiles userId={authUser.uid} />}
  </AuthUserContext.Consumer>
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

    return (
      <Wrapper>
        <AuthUserContext.Consumer>
          {authUser => (
            <div className="profile">
              {loading && <div>Loading profile info...</div>}
              {loading ? null : (
                <div>
                  <h1>Profile</h1>
                  <ImgContainer>
                    <ImageToProfile gender={gender} />
                  </ImgContainer>
                  <TxtContainer>
                    <span>
                      <strong>Username: </strong>
                      {authUser.username}
                    </span>
                    <br />
                    <span>
                      <strong>Email: </strong>
                    </span>
                    <span>{authUser.email}</span>
                    <br />
                    <span>
                      <strong>Name: </strong> {fname} {lname}
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
                  </TxtContainer>
                  <BtnContainer>
                    <Button>
                      <Edi />
                      <span> | </span>
                      <Link to={ROUTES.CREATE_PROFILE}>Edit profile</Link>
                    </Button>
                    <Button>
                      <Key />
                      <span> | </span>
                      <Link to={ROUTES.ACCOUNT}>Edit Password</Link>
                    </Button>
                  </BtnContainer>
                </div>
              )}
            </div>
          )}
        </AuthUserContext.Consumer>
      </Wrapper>
    );
  }
}

const Profiles = withFirebase(ProfileContent);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProfilePage);
