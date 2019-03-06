import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";
import { Admin, Rubrik, Details } from "../Admin/styles";
import { Button } from "../Styles/button";
import { Tele, UserD, Tie } from "../Styles/icons";

const AdminPage = () => (
  <div>
    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </div>
);

class UserListBase extends Component {
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

    return (
      <div>
        <Rubrik>
          <h1>Admin Page</h1>
        </Rubrik>
        {loading && <div>Loading ...</div>}

        {users.map(user => (
          <Admin key={user.uid}>
            <div>
              <span>
                <h2>{user.username}</h2>
              </span>
              <br />
              <span>
                <strong>ID:</strong> {user.uid}
              </span>
              <br />
              <span>
                <strong>E-Mail:</strong> {user.email}
              </span>
              <br />
              <br />
              <Link
                to={{
                  pathname: `${ROUTES.ADMIN}/${user.uid}`,
                  state: { user }
                }}
              >
                {" "}
                <Button>
                  <UserD />
                  <span> |</span> <strong>Details</strong>
                </Button>
              </Link>
            </div>
          </Admin>
        ))}
      </div>
    );
  }
}

class UserItemBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
      ...props.location.state
    };
  }

  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase
      .user(this.props.match.params.id)
      .on("value", snapshot => {
        this.setState({
          user: snapshot.val(),
          loading: false
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.user.email);
  };

  render() {
    const { user, loading } = this.state;

    return (
      <Admin>
        <Details>
          <h2>User: {user.username}</h2>
        </Details>
        {loading && <div>Loading ...</div>}
        {user && (
          <div>
            <span>
              <strong>ID:</strong> {user.uid}
            </span>
            <br />
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <br />
            <strong>Name: </strong> {user.fname} {user.lname}
            <br />
            <span>
              <strong>Gender: </strong> {user.gender}
            </span>
            <br />
            <span>
              <strong>Age:</strong> {user.age}
            </span>
            <br />
            <span>
              <strong>Phone: </strong>+46 {user.phone}
            </span>
            <br />
            <span>
              <strong>City:</strong> {user.city}
            </span>
            <br />
            <span>
              <strong>Description:</strong>
              <br /> {user.description}
            </span>
            <br />
            <br />
            <Link to={ROUTES.ADMIN}>
              <Button type="button">
                <Tie />
                <span> | </span> <strong>User List</strong>
              </Button>
            </Link>
            <Button type="button" onClick={this.onSendPasswordResetEmail}>
              <Tele />
              <span> |</span> <strong>Password Reset</strong>
            </Button>
          </div>
        )}
      </Admin>
    );
  }
}

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

const condition = authUser => authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
  withAuthorization(condition),
  withFirebase
)(AdminPage);
