import React, { useState } from "react";
import { Link } from "react-router-dom";

import MenuCloseIcon from "../../assets/MenuCloseIcon.js";

const MobileMenu = ({ user, authenticatedListItems, unauthenticatedListItems, toggleSlide }) => {
  return (
    <div className="mobile-menu" id="mobile-menu">
      <ul className="mobilemenu closed" id="mobilemenu" onClick={toggleSlide}>
        <li>
          <Link className="logo" to="/dictionaries" className="link">
              WordSmith
          </Link>
        </li>
        {user ? authenticatedListItems : unauthenticatedListItems}
      </ul>
    </div>
  );
};

export default MobileMenu;
