import { createContext, useReducer } from "react";

export const HelperContext = createContext();

export const HelperContextProvider = (props) => {
  const [helperContext, dispatch] = useReducer(reducer, {
    showAddStoreForm: false,
    showAddItemForm: false,
  });

  function reducer(state, action) {
    switch (action.type) {
      case "showAddStoreFormStatus":
        return {
          ...state,
          showAddStoreForm: action.status,
        };
      case "showAddItemFormStatus":
        return {
          ...state,
          showAddItemForm: action.status,
        };
      default:
        return state;
    }
  }

  return (
    <HelperContext.Provider value={{ helperContext, dispatch }}>
      {props.children}
    </HelperContext.Provider>
  );
};
