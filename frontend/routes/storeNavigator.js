import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import StoreSelection from "../screens/storeManagement/storeSelection";
import AddStore from "../screens/storeManagement/addStore";
import Store from "../screens/storeManagement/store";

const screens = {
  "Store Selection": { screen: StoreSelection },
  "Add Store": { screen: AddStore },
  Store: { screen: Store },
};

export default createAppContainer(createStackNavigator(screens));
