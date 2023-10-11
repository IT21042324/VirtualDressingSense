import { SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Signup, Welcome } from './screens/userManagement';

import { globalStyles } from './styles/global';
import Navigator from './routes/storeNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Navigator />
      <Toast />
    </SafeAreaView>
  );
}
