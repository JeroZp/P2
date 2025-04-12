import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import Registro from '../screens/Registro';
import CP from '../screens/C&P'
import Marketplace from '../screens/Marketplace';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="C&P" component={CP} />
        <Stack.Screen name="Marketplace" component={Marketplace} />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}
