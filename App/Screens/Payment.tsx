import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../Firebase/FirebaseConfig';

type PaymentRouteProp = RouteProp<{
  params: {
    selectedOption: string;
    selectedPickUpDate: string;
    selectedReturnDate: string;
    bookDelivery: boolean;
    price: number;
  };
}, 'params'>;

const Payment = () => {
  const navigation = useNavigation();
  const route = useRoute<PaymentRouteProp>();
  const { selectedOption, selectedPickUpDate, selectedReturnDate, bookDelivery, price } = route.params;

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Simulate payment processing
      setTimeout(async () => {
        try {
          await addDoc(collection(db, 'orders'), {
            option: selectedOption,
            pickUpDate: selectedPickUpDate,
            returnDate: selectedReturnDate,
            bookDelivery,
            totalPrice: price,
            createdAt: serverTimestamp()
          });
          Alert.alert("Payment Successful", "Your booking has been completed.");
          navigation.navigate('OrdersScreen'); // Navigate to the Orders screen
        } catch (error) {
          Alert.alert("Payment Error", "An error occurred while processing your payment. Please try again.");
        }
        setLoading(false);
      }, 2000); // Simulate a delay for payment processing
    } catch (error) {
      Alert.alert("Payment Error", "An error occurred while processing your payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Summary</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Selected Option: <Text style={styles.infoValue}>{selectedOption}</Text></Text>
        <Text style={styles.info}>Pick-Up Date: <Text style={styles.infoValue}>{selectedPickUpDate}</Text></Text>
        <Text style={styles.info}>Return Date: <Text style={styles.infoValue}>{selectedReturnDate}</Text></Text>
        <Text style={styles.info}>Include Delivery: <Text style={styles.infoValue}>{bookDelivery ? 'Yes' : 'No'}</Text></Text>
        <Text style={styles.info}>Total Price: <Text style={styles.infoValue}>GHS {price}</Text></Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#00adf5" style={styles.loader} />
      ) : (
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#E0F0F0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  infoValue: {
    fontWeight: 'bold',
    color: '#333333',
  },
  loader: {
    marginTop: 20,
  },
  payButton: {
    backgroundColor: '#5AE4A8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Payment;
