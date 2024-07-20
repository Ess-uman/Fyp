import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useOrders } from '../Context/OrdersContext';

const OrdersScreen: React.FC = () => {
  const { orders } = useOrders();

  const renderOrder = ({ item }: { item: any }) => (
    <View style={styles.orderItem}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.cost}>{item.cost}</Text>
        <Text style={styles.hirerInfo}>{item.hirerInfo}</Text>
        <Text style={styles.contact}>{item.contact}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.availability}>{item.availability}</Text>
        <Text style={styles.toolInfo}>{item.toolInfo}</Text>
        <Text style={styles.terms}>{item.terms}</Text>
        <Text style={styles.equipment}>{item.equipment}</Text>
        <Text style={styles.type}>{item.type}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={orders}
      renderItem={renderOrder}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 16,
    color: '#888',
  },
  cost: {
    fontSize: 16,
  },
  hirerInfo: {
    fontSize: 14,
  },
  contact: {
    fontSize: 14,
  },
  location: {
    fontSize: 14,
  },
  availability: {
    fontSize: 14,
  },
  toolInfo: {
    fontSize: 14,
  },
  terms: {
    fontSize: 14,
  },
  equipment: {
    fontSize: 14,
  },
  type: {
    fontSize: 14,
  },
});

export default OrdersScreen;
