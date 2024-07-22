import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { fetchOrders, Order } from '../../api';

const OrdersScreen: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetchOrders();
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching orders');
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.orderItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
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

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <FlatList
      data={orders}
      renderItem={renderOrder}
      keyExtractor={(item) => item.id.toString()}
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
