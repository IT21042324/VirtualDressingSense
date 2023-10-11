import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const UseUserContext = () => {
  const { dispatch, user } = useContext(UserContext);

  function setUser(user) {
    dispatch({
      type: "SetUser",
      payload: user,
    });
  }

  return {
    dispatch,
    user,
    setUser,
  };
};
