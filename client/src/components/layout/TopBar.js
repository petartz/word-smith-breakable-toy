import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import UserProfileButton from "../authentication/UserProfileButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToolbox } from "@fortawesome/free-solid-svg-icons"

import favicon from "../../../public/favicon.jpg"

const TopBar = ({ user }) => {

  const homeRedirect = () => {
    location.href = "/home"
  }

  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link className="link" to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link className="link" to="/users/new" className="link">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="user-profile">
      <UserProfileButton user={user}/>
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="logo">
            <img src= {favicon} alt="icon" onClick={homeRedirect}></img>
          </li>
          <li className="about">
            <Link className="link" to="/">About</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
