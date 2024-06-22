import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'firebase/app';
import 'firebase/auth';
import React from 'react';
import { Text, View } from 'react-native';
import EquipmentDetailScreen from './App/Screens/EquipmentDetails';
import Home from './App/Screens/Home';
import LoginScreen from './App/Screens/login';
import ResetPassword from './App/Screens/ResetPassword';
import SignupScreen from './App/Screens/SignupScreen';
import SplashScreen from './App/Screens/SplashScreen';
import styles from './App/style';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown: false}}/>
        <Stack.Screen name="EquipmentDetail" component={EquipmentDetailScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const WelcomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to the App!</Text>
    </View>
  );
};

export default App;
