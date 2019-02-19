import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Ham } from "./styles";
import SignOutButton from "../SignOut";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

class Example extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Ham>
        <Menu isOpen={false} width={"60%"}>
          <ul>
            <li>
              <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li>
              <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
              <Link to={ROUTES.PROFILE}>Profile</Link>
            </li>
            <li>
              <Link to={ROUTES.ACTIVITY}>Activity</Link>
            </li>
            <li>
              <Link to={ROUTES.CHAT}>Chat</Link>
            </li>
            {/* <li>
              <Link to={ROUTES.LOCATION}>Location</Link>
            </li> */}
            {this.props.authUser.roles.includes(ROLES.ADMIN) && (
              <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
              </li>
            )}
            <li>
              <SignOutButton />
            </li>
          </ul>
        </Menu>
      </Ham>
    );
  }
}

export default Example;
