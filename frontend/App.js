import { SafeAreaView } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import { globalStyles } from "./styles/global";
import Navigator from "./routes/storeNavigator";

export default function App() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Navigator />
    </SafeAreaView>
  );
}
