import React, { Component } from "react";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import ImageToProfile from "./profileImage";
import { ImgContainer, OtherP } from "./styles";

const ShowUser = ({ userId }) => (
  <AuthUserContext.Consumer>
    {() => (
      <div className="profile">
        <Profiles userId={userId} />
      </div>
    )}
  </AuthUserContext.Consumer>
);

class ShowProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        users: usersList
      });
    });
  }
  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users } = this.state;
    const { userId } = this.props;
    return (
      <OtherP>
        <div>
          {users
            .filter(user => user.uid === userId)
            .map(u => (
              <div key={u.toString()}>
                <ImgContainer>
                  <ImageToProfile gender={u.gender} />
                </ImgContainer>
                <h2>{u.username}</h2>
                <h4>
                  {u.gender}, {u.age}
                </h4>
                <p>{u.description}</p>
                <br />
              </div>
            ))}
        </div>
      </OtherP>
    );
  }
}

const Profiles = withFirebase(ShowProfile);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ShowUser);
