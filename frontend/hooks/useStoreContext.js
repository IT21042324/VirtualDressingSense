import { useContext } from "react";
import { StoreContext } from "../context/store";

export const UseStoreContext = () => {
  const storeContext = useContext(StoreContext);
  const { dispatch, stores } = storeContext;

  return { storeContext, dispatch, stores };
};
