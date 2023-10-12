import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import StoreSelection from "../screens/storeManagement/storeSelection";
import Store from "../screens/storeManagement/store";
import { Login, Signup, Welcome } from "../screens/userManagement";
import { Header } from "../components/storeManagement/Header";
import { colorVariants } from "../global/string";
import { UserProfile } from "../screens/userManagement/profile";
import { Product } from "../screens/userManagement/product";

const screens = {
  Welcome: { screen: Welcome, navigationOptions: { headerShown: false } },
  Login: { screen: Login },
  Signup: { screen: Signup },
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
  Product: {
    screen: Product,
  },
  Profile: {
    screen: UserProfile,
  },
};

const stackNavigator = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "black",
    headerStyle: {
      backgroundColor: colorVariants.whiteSmoke,
      height: 60,
    },
  },
});

export default createAppContainer(stackNavigator);
