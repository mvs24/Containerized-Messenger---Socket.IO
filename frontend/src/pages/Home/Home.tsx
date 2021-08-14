import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import {
  followNewUserRequest,
  getOtherUsers,
  unfollowUserRequest,
} from "../../httpRequests/user";
import { User } from "../../types";
import UserCmp from "./components/User";
import classes from "./Home.module.css";

const Home = (props: { user: User }) => {
  const { user, getMyFollowings, followings, followNewUser, unfollowUser } =
    useContext(AuthContext);
  const loggedInUser = user || props.user;
  const params = useParams() as { page: string };
  const [otherUsers, setOtherUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [error, setError] = useState<undefined | string>();

  useEffect(() => {
    setPage(parseInt(params.page));
  }, [params]);

  useEffect(() => {
    const getAllOtherUsers = async function () {
      const { data } = await getOtherUsers(page, limit);
      setOtherUsers(data.data);
    };

    getAllOtherUsers();
  }, [page]);

  useEffect(() => {
    getMyFollowings();
  }, []);

  const followUser = async function (id: string) {
    try {
      const { data } = await followNewUserRequest(id);
      followNewUser(data.data.following);
    } catch (error) {
      setError(error);
    }
  };

  const unfollow = async function (id: string) {
    try {
      await unfollowUserRequest(id);
      unfollowUser(id);
    } catch (error) {}
  };

  return (
    <div className={classes.otherUsers}>
      {otherUsers.map((user: User) => {
        return (
          <UserCmp
            unfollowUser={unfollow}
            followUser={followUser}
            followed={followings.some(
              (followingUserId) => followingUserId === user._id
            )}
            user={user}
            key={user._id}
          />
        );
      })}
    </div>
  );
};

export default Home;
