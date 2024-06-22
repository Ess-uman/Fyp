import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from './Navigation/navigationTypes';

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;

const equipmentCategories = [
  { id: '1', title: 'Tractors', image: require('./assets/cat.tractor.jpg') },
  { id: '2', title: 'Harvesters', image: require('./assets/cat.harvester 1.png') },
  { id: '3', title: 'Plows', image: require('./assets/cat.plow.png') },
  { id: '4', title: 'Sprayers', image: require('./assets/cat.sprayer.png') },
  { id: '5', title: 'Cultivators', image: require('./assets/cat.Cultivators.png') },
  { id: '6', title: 'Balers', image: require('./assets/cat.Baler.png') },
];

const equipmentItems = [
  { id: '1', title: 'JohnDeere 1025R', category: 'Tractors', image: require('./assets/John Deere 1025R.png'), cost: '$150/day', hirerInfo: 'John Doe', contact: '123-456-7890' },
  { id: '2', title: 'Case IH 8240', category: 'Harvesters', image: require('./assets/Case IH 8240.png'), cost: '$200/day', hirerInfo: 'Jane Smith', contact: '098-765-4321' },
  { id: '3', title: 'Kuhn Master 153', category: 'Plows', image: require('./assets/Kuhn Master 153.png'), cost: '$100/day', hirerInfo: 'Richard Roe', contact: '555-555-5555' },
  { id: '4', title: 'Hardi Navigator', category: 'Sprayers', image: require('./assets/Hardi Navigator.png'), cost: '$180/day', hirerInfo: 'Alice Johnson', contact: '444-444-4444' },
  { id: '5', title: 'Rata Cultivator', category: 'Cultivators', image: require('./assets/cat.Cultivators.png'), cost: '$180/day', hirerInfo: 'Alice Johnson', contact: '444-444-4444' },
  { id: '6', title: '328 Small Square Baler', category: 'Balers', image: require('./assets/328 Small Square Baler.png'), cost: '$180/day', hirerInfo: 'Alice Johnson', contact: '444-444-4444' },

];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const renderCategoryItem = ({ item }: { item: typeof equipmentCategories[0] }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderEquipmentItem = ({ item }: { item: typeof equipmentItems[0] }) => (
    <TouchableOpacity
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
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Welcome to AgriRent</Text>
      <Text style={styles.subHeader}>Rent the Best Farming Equipment</Text>

      <FlatList
        data={equipmentCategories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />

      <Text style={styles.sectionTitle}>Available Equipment</Text>

      <FlatList
        data={equipmentItems}
        renderItem={renderEquipmentItem}
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
    paddingTop: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 9,
  },
  subHeader: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: -5,
  },
  categoryList: {
    paddingVertical: 50,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 45,
  },
  categoryImage: {
    width: 60,
    height: 50,
    marginBottom: 5,
    borderRadius: 15,
  },
  categoryTitle: {
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
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

export default HomeScreen;
