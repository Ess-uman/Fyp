import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
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
  { id: '1', title: 'JohnDeere 1025R', category: 'Tractors', image: require('./assets/John Deere 1025R.png'), cost: 'GHS 150/day', hirerInfo: 'Bekoe', contact: '024 300 0000' },
  { id: '2', title: 'Case IH 8240', category: 'Harvesters', image: require('./assets/Case IH 8240.png'), cost: 'GHS 200/day', hirerInfo: 'Rab Ltd', contact: '024 300 0000' },
  { id: '3', title: 'Kuhn Master 153', category: 'Plows', image: require('./assets/Kuhn Master 153.png'), cost: 'GHS 100/day', hirerInfo: 'Richard Odoi', contact: '024 300 0000' },
  { id: '4', title: 'Hardi Navigator', category: 'Sprayers', image: require('./assets/Hardi Navigator.png'), cost: 'GHS 180/day', hirerInfo: 'BB ltd', contact: '024 300 0000' },
  { id: '5', title: 'Rata Cultivator', category: 'Cultivators', image: require('./assets/cat.Cultivators.png'), cost: 'GHS 180/day', hirerInfo: 'Bernard Johnson', contact: '024 300 0000' },
  { id: '6', title: '328 Small Square Baler', category: 'Balers', image: require('./assets/328 Small Square Baler.png'), cost: 'GHS 180/day', hirerInfo: 'Alex', contact: '024 300 0000' },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState(equipmentItems);

  const updateSearch = (search: string) => {
    setSearch(search);
    if (search) {
      const filteredData = equipmentItems.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredItems(filteredData);
    } else {
      setFilteredItems(equipmentItems);
    }
  };

  const renderCategoryItem = ({ item }: { item: typeof equipmentCategories[0] }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.categoryItem}
      onPress={() => navigation.navigate('CategoryEquipment', { category: item.title })}
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handlePress = (item: typeof equipmentItems[0]) => {
    const cost = parseFloat(item.cost.replace('GHS ', '').replace('/day', '')); // Convert cost to number
    navigation.navigate('EquipmentDetailsScreen', {
      selectedEquipment: { label: item.title },
      selectedType: item.category,
      cost: cost, // Pass the number cost
      image: item.image,
      category: item.category,
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topContainer}>
        <Text style={styles.findEquipmentText}>Find Equipment</Text>
        <SearchBar
          placeholder="Search Equipment"
          onChangeText={updateSearch}
          value={search}
          containerStyle={styles.searchContainer}
          inputContainerStyle={styles.searchInputContainer}
        />
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
          {equipmentCategories.map(item => renderCategoryItem({ item }))}
        </ScrollView>
      </View>

      <Text style={styles.sectionTitle}>Most Rented</Text>

      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={styles.equipmentItem}
            onPress={() => handlePress(item)}
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
    backgroundColor: '#F5F5F5',
  },
  topContainer: {
    backgroundColor: '#5AE4A8',
    padding: 20,
    paddingTop: 100,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  findEquipmentText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    paddingHorizontal: 0,
  },
  searchInputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  categoryContainer: {
    height: 120,
    marginVertical: 20,
  },
  categoryList: {
    alignItems: 'center',
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
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
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  equipmentList: {
    paddingHorizontal: 20,
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
