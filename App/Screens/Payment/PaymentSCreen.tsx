import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useOrders } from '../Context/OrdersContext';
import { RootStackParamList } from '../Navigation/navigationTypes';

type PaymentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PaymentScreen'>;
type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'PaymentScreen'>;

const PaymentScreen: React.FC = () => {
  const navigation = useNavigation<PaymentScreenNavigationProp>();
  const route = useRoute<PaymentScreenRouteProp>();
  const { startDate, endDate, cost } = route.params;
  const { addOrder } = useOrders();

  const handlePaymentSuccess = async () => {
    const order = {
      title: 'Example Equipment', // Replace with actual data
      image: { uri: 'https://example.com/image.jpg' }, // Replace with actual data
      category: 'Category', // Replace with actual data
      cost: `$${cost}`,
      hirerInfo: 'Hirer Info', // Replace with actual data
      contact: 'Contact Info', // Replace with actual data
      location: 'Location', // Replace with actual data
      availability: `${startDate.toDateString()} - ${endDate.toDateString()}`,
      toolInfo: 'Tool Info', // Replace with actual data
      terms: 'Terms and Conditions', // Replace with actual data
      equipment: 'Equipment Info', // Replace with actual data
      type: 'Type Info', // Replace with actual data
    };

    try {
      await addOrder(order);
      navigation.navigate('OrdersScreen');
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.info}>Start Date: {startDate.toDateString()}</Text>
      <Text style={styles.info}>End Date: {endDate.toDateString()}</Text>
      <Text style={styles.info}>Total Cost: ${cost}</Text>
      <Button onPress={handlePaymentSuccess} title="Confirm Payment" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  info: {
    fontSize: 16,
    marginVertical: 8,
  },
});

export default PaymentScreen;
