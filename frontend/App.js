import { SafeAreaView } from "react-native";
import "react-native-gesture-handler";
import Toast from "react-native-toast-message";

import { globalStyles } from "./styles/global";
import Navigator from "./routes/storeNavigator";
import { StoreContextProvider } from "./context/store";

export default function App() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <StoreContextProvider>
        <Navigator />
        <Toast />
      </StoreContextProvider>
    </SafeAreaView>
  );
}
