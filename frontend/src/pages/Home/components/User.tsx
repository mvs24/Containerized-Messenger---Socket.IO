import React from "react";
import Button from "../../../shared/Button/Button";
import { User } from "../../../types";
import classes from "./User.module.css";

const UserCmp = (props: { user: User }) => {
  const { user } = props;
  return (
    <div className={classes.userContainer}>
      <img src="https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg" />

      <div>
        <span>{user.name}</span>
        <span>{user.lastname}</span>
      </div>
      <div className={classes.buttonContainer}>
        <Button title="Follow" />

        <Button title="Unfollow" />
        <Button title="Message" />
      </div>
    </div>
  );
};

export default UserCmp;
