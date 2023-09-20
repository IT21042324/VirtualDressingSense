import "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { useState } from "react";
import { globalStyles } from "./styles/global";
import Navigator from "./routes/storeNavigator";
import { StoreContextProvider } from "./context/store";
import { Layout as RapiLayout } from "react-native-rapi-ui";
import { MenuProvider } from "react-native-popup-menu";
import { ThemeProvider } from "react-native-elements";
import { SafeAreaView } from "react-native";

import * as Font from "expo-font";
import { AppLoading } from "expo";

const getFonts = () =>
  Font.loadAsync({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return <Home />;
  } else {
    return (
      <RapiLayout>
        <SafeAreaView style={globalStyles.container}>
          <StoreContextProvider>
            <MenuProvider>
              <ThemeProvider>
                <Navigator />
                <Toast />
              </ThemeProvider>
            </MenuProvider>
          </StoreContextProvider>
        </SafeAreaView>
      </RapiLayout>
    );
  }
}
