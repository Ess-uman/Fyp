import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CategoryScreen from '../Equipments/CategoryEquipment';
import DateSelectionTimeScreen from '../Equipments/DateSelectionTimeScreen';
import EquipmentDetailScreen from '../Equipments/EquipmentDetails';
import HomeScreen from '../Home';
import OrdersScreen from '../NavBar/OrdersScreen';
import SettingsScreen from '../NavBar/SettingsScreen';
import Payment from '../Payment';




const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5AE4A8',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="EquipmentDetail" component={EquipmentDetailScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DateSelectionTimeScreen" component={DateSelectionTimeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />



    </Stack.Navigator>
  );
};

export default AppNavigator;
