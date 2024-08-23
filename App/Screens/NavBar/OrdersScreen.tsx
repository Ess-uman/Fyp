import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);




  return (
    <View style={styles.container}>
      <Text style={styles.header}>Orders</Text>

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
