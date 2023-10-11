import React, { createContext, useReducer } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [users, dispatch] = useReducer(reducer, {
    user: {},
  });

  function reducer(state, action) {
    switch (action.type) {
      case "SetUser":
        return {
          user: action.payload,
        };

      case "UpdateUser": {
        return {
          user: action.payload,
        };
      }

      case "Logout":
        return { user: {} };

      default:
        return state;
    }
  }

  return (
    <UserContext.Provider value={{ ...users, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};
