import { useContext } from "react";
import { HelperContext } from "../context/helper";

export const UseHelperContext = () => {
  const helperContextContents = useContext(HelperContext);
  const { dispatch, helperContext } = helperContextContents;

  return { helperContext, dispatch };
};
