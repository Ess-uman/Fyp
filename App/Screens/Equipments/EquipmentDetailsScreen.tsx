import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../Navigation/navigationTypes';

type EquipmentDetailsScreenRouteProp = RouteProp<RootStackParamList, 'EquipmentDetailsScreen'>;

interface EquipmentOption {
  label: string;
  value: string;
}

const EquipmentDetailsScreen: React.FC = () => {
  const route = useRoute<EquipmentDetailsScreenRouteProp>();
  const navigation = useNavigation();
  const { title, image, category, cost, hirerInfo, contact } = route.params;
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentOption | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const location = "North Legon, Accra";
  const availability = "Pickup and Delivery available";
  const toolInfo = "This is a high-quality tool that is perfect for both professional and DIY projects. It is durable, reliable, and easy to use.";
  const terms = "The tool must be returned in the same condition it was rented. Late returns will incur an additional fee. Any damage to the tool will be assessed and charged accordingly.";

  const equipmentOptions: EquipmentOption[] = [
    { label: 'Tractor', value: 'Tractor' },
    { label: 'Harvester', value: 'Harvester' },
    { label: 'Baler', value: 'Baler' },
    { label: 'Plow', value: 'Plow' },
    { label: 'Sprayer', value: 'Sprayer' },
    { label: 'Cultivator', value: 'Cultivator' },
  ];

  const equipmentTypes: { [key: string]: string[] } = {
    Tractor: ['Utility Tractor ', 'Raw Crop Tractor', 'compact tractor'],
    Harvester: ['Combine Harvester', 'Forage Harvester'],
    Baler: ['Round Baler', 'Square Baler', 'Silage Baler'],
    Plow: ['MoldBoard Plow', 'Disc Plow', 'Chisel Plow'],
    Sprayer: ['Boom Sprayer', 'Mist Sprayer ', 'Air Blast Sprayer'],
    Cultivator: ['Field Cultivator', 'Row Crop Cultivator', 'Rotary Cultivator'],
  };

  const handleHireNow = () => {
    if (selectedEquipment && selectedType) {
      navigation.navigate('Payment', {
        title,
        image,
        category,
        cost,
        hirerInfo,
        contact,
        selectedEquipment,
        selectedType,
      });
    } else {
      Alert.alert('Error', 'Please select equipment and type before proceeding');
    }
  };

  const renderOption = ({ item }: { item: EquipmentOption }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => {
        setSelectedEquipment(item);
        setSelectedType(null);
        setModalVisible(false);
      }}
    >
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderType = (type: string) => (
    <TouchableOpacity
      style={styles.typeOption}
      onPress={() => setSelectedType(type)}
    >
      <View style={styles.checkbox}>
        {selectedType === type && <View style={styles.checkedCircle} />}
      </View>
      <Text>{type}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.box}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.cost}>Cost to Rent per day: {cost}</Text>
        <Text style={styles.hirerInfo}>Hirer's Info: {hirerInfo}</Text>
        <Text style={styles.contact}>Contact: {contact}</Text>
        <Text style={styles.location}>Location: {location}</Text>
        <Text style={styles.availability}>Availability: {availability}</Text>
        <Text style={styles.toolInfo}>Tool Info: {toolInfo}</Text>
        <Text style={styles.terms}>Terms and Conditions: {terms}</Text>

        <Text style={styles.pickerLabel}>Select Equipment:</Text>
        <TouchableOpacity
          style={styles.pickerContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text>{selectedEquipment ? selectedEquipment.label : 'Select equipment'}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.modalBackdrop}
              onPress={() => setModalVisible(false)}
            />
            <View style={styles.modalContent}>
              <FlatList
                data={equipmentOptions}
                renderItem={renderOption}
                keyExtractor={(item) => item.value}
                style={{ flexGrow: 1, width: '100%' }}
              />
            </View>
          </View>
        </Modal>

        {selectedEquipment && (
          <View style={styles.typeContainer}>
            <Text style={styles.pickerLabel}>Select Type:</Text>
            <FlatList
              data={equipmentTypes[selectedEquipment.value]}
              renderItem={({ item }) => renderType(item)}
              keyExtractor={(item, index) => `${item}-${index}`}
              style={styles.typeList}
            />
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, (!selectedEquipment || !selectedType) && styles.disabledButton]}
          onPress={handleHireNow}
          disabled={!selectedEquipment || !selectedType}
        >
          <Text style={styles.buttonText}>Rent Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  box: {
    width: '100%',
    borderWidth: 0.2,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 30,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  category: {
    fontSize: 18,
    color: '#888',
    marginBottom: 10,
  },
  cost: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hirerInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  contact: {
    fontSize: 16,
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    marginBottom: 10,
  },
  availability: {
    fontSize: 16,
    marginBottom: 10,
  },
  toolInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
  terms: {
    fontSize: 16,
    marginBottom: 10,
  },
  pickerLabel: {
    fontSize: 18,
    marginBottom: 5,

  },
  pickerContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    marginBottom: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 15,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  typeContainer: {
    marginTop: 10,
    padding: -10,
  },
  typeList: {
    maxHeight: 150,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#5AE4A8',
  },
  button: {
    backgroundColor: '#5AE4A8',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#AAA',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default EquipmentDetailsScreen;