import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import StoreSelection from "../screens/storeManagement/storeSelection";
import Store from "../screens/storeManagement/store";
import { Header } from "../components/storeManagement/Header";

const screens = {
  "Store Selection": {
    screen: StoreSelection,
    navigationOptions: {
      headerTitle: () => <Header title={"Store Selection"} />,
    },
  },

  Store: {
    screen: Store,
    navigationOptions: {
      headerTitle: () => <Header title={"Store"} />,
    },
  },
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
