import React, { useState } from "react";
import { Link } from "react-router-dom";
import favicon from "../../../../public/favicon.jpg"


import MenuCloseIcon from "../../assets/MenuCloseIcon.js";

const MobileMenu = ({ user, authenticatedListItems, unauthenticatedListItems, toggleVisible }) => {
  return (
    <div className="mobile-menu" id="mobile-menu">
      <div className="menuicon" onClick={toggleVisible}>
        {MenuCloseIcon}
      </div>
      <ul className="mobilemenu" onClick={toggleVisible}>
        <li>
          <Link className="logo" to="/home" className="link">
              WordSmith
          </Link>
        </li>
        {user ? authenticatedListItems : unauthenticatedListItems}
      </ul>
    </div>
  );
};

export default MobileMenu;
