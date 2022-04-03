import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import UserProfileButton from "../authentication/UserProfileButton";
import MobileMenu from "./mobile/MobileMenu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToolbox } from "@fortawesome/free-solid-svg-icons";

import favicon from "../../../public/favicon.jpg"

const TopBar = ({ user }) => {

  const toggleSlide = () => {
    document.getElementById('mobilemenu').classList.toggle('closed')
  };

  const closeMenu = () => {
    if(!document.getElementById("mobilemenu closed")){
      document.getElementById('mobilemenu').classList.add('closed')
    }
  }

  const unauthenticatedListItems = [
    <li key="about">
      <Link className="link" to="/">About</Link>
    </li>,
    <li key="sign-in">
      <Link className="link" to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link className="link" to="/users/new">Create an account</Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="about">
      <Link className="link" to="/">About</Link>
    </li>,
    <li key="user-profile">
      <UserProfileButton user={user}/>
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>
  ];

  return (
    <div className="menu-container">
      <div className="top-bar">
        <div className="top-bar-left">
          <Link to="/dictionaries">
            <img className="logo" src= {favicon} onClick={closeMenu} alt="icon"></img>
          </Link>
        </div>
        <div className="show-for-medium">
          <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
        </div>

        <div className="show-for-small-only mobile-menu-right">
              <svg
                onClick={toggleSlide}
                id="menu-open"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
              </svg>

              <MobileMenu
                user={user}
                authenticatedListItems={authenticatedListItems}
                unauthenticatedListItems={unauthenticatedListItems}
                toggleSlide={toggleSlide}
              />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
