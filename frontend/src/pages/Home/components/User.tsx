import React from "react";
import Button from "../../../shared/Button/Button";
import { User } from "../../../types";
import classes from "./User.module.css";

const UserCmp = (props: {
  user: User;
  followed: boolean;
  followUser: (id: string) => void;
  unfollowUser: (id: string) => void;
}) => {
  const { user, followed, followUser, unfollowUser } = props;
  return (
    <div className={classes.userContainer}>
      <img src="https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg" />

      <div>
        <span>{user.name}</span>
        <span>{user.lastname}</span>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          onClick={() => followUser(user._id)}
          title={followed ? "Followed" : "Follow"}
          disabled={followed}
        />

        <Button
          title="Unfollow"
          onClick={() => unfollowUser(user._id)}
          disabled={!followed}
        />
        <Button title="Message" disabled={!followed} />
      </div>
    </div>
  );
};

export default UserCmp;
