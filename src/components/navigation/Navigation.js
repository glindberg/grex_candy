import React, { Component } from 'react';
import { NavStyles } from './NavStyles';
import { NavLink } from "react-router-dom";
import Home from '../home/Home';
import Profile from '../profile/Profile';

const Nav = () => (
    <NavStyles>
    <div>
        <ul>
            <li><NavLink exact activeClassName="current" to="/" title="Home">Home</NavLink></li>
            <li><NavLink exact activeClassName="current" to="/profile" title="Profile">Profile</NavLink></li>
        </ul>
    </div>
    </NavStyles>
)





export default Nav;