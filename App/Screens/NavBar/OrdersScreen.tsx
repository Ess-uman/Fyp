import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { db } from '../../Firebase/FirebaseConfig';

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const ordersData = querySnapshot.docs.map(doc => doc.data());
      setOrders(ordersData);
    };

    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text>Option: {item.option}</Text>
            <Text>Pick-Up Date: {item.pickUpDate}</Text>
            <Text>Return Date: {item.returnDate}</Text>
            <Text>Include Delivery: {item.bookDelivery ? 'Yes' : 'No'}</Text>
            <Text>Total Price: GHS {item.totalPrice}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E0F0F0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  orderItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
});

export default OrdersScreen;
