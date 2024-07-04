import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from './Navigation/navigationTypes';

type CategoryEquipmentScreenRouteProp = RouteProp<RootStackParamList, 'CategoryEquipment'>;
type CategoryEquipmentScreenNavigationProp = NavigationProp<RootStackParamList, 'CategoryEquipment'>;

const equipmentItems = [
  { id: '1', title: 'JohnDeere 1025R', category: 'Tractors', image: require('./assets/John Deere 1025R.png'), cost: 'GHS 150/day', hirerInfo: 'Bekoe', contact: '024 300 0000' },
  { id: '2', title: 'Case IH 8240', category: 'Harvesters', image: require('./assets/Case IH 8240.png'), cost: 'GHS 200/day', hirerInfo: 'Rab Ltd', contact: '024 300 0000' },
  { id: '3', title: 'Kuhn Master 153', category: 'Plows', image: require('./assets/Kuhn Master 153.png'), cost: 'GHS 100/day', hirerInfo: 'Richard Odoi', contact: '024 300 0000' },
  { id: '4', title: 'Hardi Navigator', category: 'Sprayers', image: require('./assets/Hardi Navigator.png'), cost: 'GHS 180/day', hirerInfo: 'BB ltd', contact: '024 300 0000' },
  { id: '5', title: 'Rata Cultivator', category: 'Cultivators', image: require('./assets/cat.Cultivators.png'), cost: 'GHS 180/day', hirerInfo: 'Bernard Johnson', contact: '024 300 0000' },
  { id: '6', title: '328 Small Square Baler', category: 'Balers', image: require('./assets/328 Small Square Baler.png'), cost: 'GHS 180/day', hirerInfo: 'Alex', contact: '024 300 0000' },
];

const CategoryEquipmentScreen: React.FC = () => {
  const route = useRoute<CategoryEquipmentScreenRouteProp>();
  const navigation = useNavigation<CategoryEquipmentScreenNavigationProp>();
  const { category } = route.params;

  const filteredItems = equipmentItems.filter(item => item.category === category);

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>{category}</Text>
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={styles.equipmentItem}
            onPress={() => navigation.navigate('EquipmentDetail', {
              title: item.title,
              image: item.image,
              category: item.category,
              cost: item.cost,
              hirerInfo: item.hirerInfo,
              contact: item.contact,
            })}
          >
            <Image source={item.image} style={styles.equipmentImage} />
            <Text style={styles.equipmentTitle}>{item.title}</Text>
            <Text style={styles.equipmentCategory}>{item.category}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.equipmentList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  equipmentList: {
    paddingBottom: 20,
  },
  equipmentItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  equipmentImage: {
    width: 250,
    height: 150,
    marginBottom: 5,
    borderRadius: 15,
  },
  equipmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  equipmentCategory: {
    fontSize: 14,
    color: '#888',
  },
});

export default CategoryEquipmentScreen;
