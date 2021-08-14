import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { getOtherUsers } from "../../httpRequests/user";
import { User } from "../../types";
import UserCmp from "./components/User";
import classes from "./Home.module.css";

const Home = (props: { user: User }) => {
  const { user } = useContext(AuthContext);
  const loggedInUser = user || props.user;
  const params = useParams() as { page: string };
  const [otherUsers, setOtherUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

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

  return (
    <div className={classes.otherUsers}>
      {otherUsers.map((user: User) => {
        return <UserCmp user={user} key={user._id} />;
      })}
    </div>
  );
};

export default Home;
