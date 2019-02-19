import React, { Component } from "react";
import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import ImageToProfile from "./profileImage";
import { Wrapper, ImgContainer } from "./styles";

const ShowUser = ({ userId }) => (
  <Wrapper>
    <AuthUserContext.Consumer>
      {() => (
        <div className="profile">
          <ul>
            <Profiles userId={userId} />
          </ul>
        </div>
      )}
    </AuthUserContext.Consumer>
  </Wrapper>
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
      <div>
        <ul>
          {users
            .filter(user => user.uid === userId)
            .map(u => (
              <li key={u.id}>
                <div>
                  <ImgContainer>
                    <ImageToProfile gender={u.gender} />
                  </ImgContainer>
                  <h2>{u.username}</h2>
                  <h5>
                    {u.gender}, {u.age}
                    <br />
                    {u.description}
                  </h5>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

const Profiles = withFirebase(ShowProfile);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ShowUser);
