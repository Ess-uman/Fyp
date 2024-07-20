import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { OrdersProvider } from './App/Screens/Context/OrdersContext';
import LoginScreen from './App/Screens/LoginScreen';
import AppNavigator from './App/Screens/Navigation/AppNavigator';
import ResetPassword from './App/Screens/ResetPassword';
import SignupScreen from './App/Screens/SignupScreen';
import SplashScreen from './App/Screens/SplashScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <OrdersProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
          <Stack.Screen name="AppNavigator" component={AppNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </OrdersProvider>
  );
};

export default App;
