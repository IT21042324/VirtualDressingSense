import "react-native-gesture-handler";
import Toast from "react-native-toast-message";

import { globalStyles } from "./styles/global";
import Navigator from "./routes/storeNavigator";
import { StoreContextProvider } from "./context/store";
import { Layout as RapiLayout } from "react-native-rapi-ui";
import { MenuProvider } from "react-native-popup-menu";
import { ThemeProvider } from "react-native-elements";
import { SafeAreaView } from "react-native";

export default function App() {
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
