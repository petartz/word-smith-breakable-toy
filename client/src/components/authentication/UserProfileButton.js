import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";

const UserProfileButton = (props) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // console.log(props.user)

  const userProfile = async (event) => {
    event.preventDefault()
    setShouldRedirect(true)
  }

  // if (shouldRedirect) {
  //   location.href = `/profile/${props.user.id}`;
  // }

  // return (
  //   <button type="button" className="button" onClick={userProfile}>
  //   Profile
  // </button>
  // )

  return (
    <p>
      <Link className="profilebtn link" to={`/profile/${props.user.id}`}>
        Profile
      </Link>
    </p>
  );
};

export default UserProfileButton;
