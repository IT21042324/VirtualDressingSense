import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import StoreSelection from "../screens/storeManagement/storeSelection";
import Store from "../screens/storeManagement/store";

const screens = {
  "Store Selection": { screen: StoreSelection },
  Store: { screen: Store },
};

const stackNavigator = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#fff",
    headerStyle: {
      backgroundColor: "dodgerblue",
      height: 60,
    },
  },
});

export default createAppContainer(stackNavigator);
