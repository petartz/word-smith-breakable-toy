import React, { useState } from "react";
import { Link } from "react-router-dom";

import MenuCloseIcon from "../../assets/MenuCloseIcon.js";

const MobileMenu = ({ user, authenticatedListItems, unauthenticatedListItems, toggleSlide }) => {
  return (
    <div className="mobile-menu closed" id="mobile-menu">
      {/* <div className="menuicon" onClick={toggleVisible}>
        {MenuCloseIcon}
      </div> */}
      <ul className="mobilemenu" onClick={toggleSlide}>
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
