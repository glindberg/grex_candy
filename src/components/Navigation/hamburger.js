import React from "react";
import { slide as Menu } from "react-burger-menu";
import styled from "styled-components";
import SignOutButton from "../SignOut";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import * as ROLES from '../../constants/roles';
import { AuthUserContext } from "../Session";

const Ham = styled.section`
    
  /* Position and sizing of burger button */
  .bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    left: 15px;
    top: 15px;
  }

  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: white;
  }

  /* Color/shape of burger icon bars on hover*/
  .bm-burger-bars-hover {
    background: #a90000;
  }

  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }

  /* Color/shape of close button cross */
  .bm-cross {
    background: #bdc3c7;
  }

  /*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
  .bm-menu-wrap {
    position: fixed;
    height: 100%;
  }

  /* General sidebar styles */
  .bm-menu {
    background: white;
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
    overflow-y: hidden !important;
  }

  /* Morph shape necessary with bubble or elastic */
  .bm-morph-shape {
    fill: #373a47;
  }

  /* Wrapper for item list */
  .bm-item-list {
    color: #b8b7ad;
    padding: 0.8em;
    text-align: center;
    
  }

  /* Individual item */
  .bm-item {
    display: inline-block;
    outline: none;
    padding: 0;
  }

  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
  ul{
      list-style: none;
  }
  li{
      padding: 5px;
  }
  a{
      color: black;
      text-decoration: none; 
  }
`;

class Example extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Ham>
        <Menu isOpen={ false } width= {"50%"}  >
          <ul>
            <li>
              <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li>
              <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
              <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
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
