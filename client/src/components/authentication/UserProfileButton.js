import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";

const UserProfileButton = (props) => {
  return (
      <Link className="link" to={`/profile/${props.user.id}`}>
        Profile
      </Link>
  );
};

export default UserProfileButton;
