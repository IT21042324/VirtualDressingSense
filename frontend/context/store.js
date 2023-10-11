import { createContext, useReducer } from "react";
import React from "react";

export const StoreContext = createContext();

export const StoreContextProvider = (props) => {
  const [stores, dispatch] = useReducer(reducer, {
    stores: [],
  });

  function reducer(state, action) {
    switch (action.type) {
      case "AddStore":
        return { stores: [action.payload, ...state.stores] };
      case "SetStores":
        return { stores: action.payload };
      case "ReplaceStore":
        return {
          stores: state.stores.map((store) => {
            if (store._id === action.payload.store._id) {
              return action.payload.store;
            } else {
              return store;
            }
          }),
        };
      case "RemoveItemFromStore":
        return {
          stores: state.stores.map((store) => {
            if (store._id === action.payload.storeId) {
              return {
                ...store,
                items: store.items.filter(
                  (item) => item !== action.payload.itemId
                ),
              };
            } else {
              return store;
            }
          }),
        };
      case "AddItem":
        return {
          stores: state.stores.map((store) => {
            if (store._id === action.payload.storeId) {
              return {
                ...store,
                items: [...store.items, action.payload.itemId],
              };
            } else {
              return store;
            }
          }),
        };
      default:
        return state;
    }
  }

  return (
    <StoreContext.Provider value={{ ...stores, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};
