import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from './Navigation/navigationTypes';

type EquipmentDetailScreenRouteProp = RouteProp<RootStackParamList, 'EquipmentDetail'>;

interface EquipmentOption {
  label: string;
  value: string;
}

const EquipmentDetailScreen: React.FC = () => {
  const route = useRoute<EquipmentDetailScreenRouteProp>();
  const { title, image, category, cost, hirerInfo, contact } = route.params;
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentOption>({ label: 'Select equipment', value: '' });
  const [modalVisible, setModalVisible] = useState(false);

  // Example data
  const location = "123 Tool Street, Tooltown, TX 12345";
  const availability = "Pickup and Delivery available";
  const toolInfo = "This is a high-quality tool that is perfect for both professional and DIY projects. It is durable, reliable, and easy to use.";
  const terms = "The tool must be returned in the same condition it was rented. Late returns will incur an additional fee. Any damage to the tool will be assessed and charged accordingly.";

  const equipmentOptions: EquipmentOption[] = [
    { label: 'Select equipment', value: '' },
    { label: 'Drill', value: 'drill' },
    { label: 'Saw', value: 'saw' },
    { label: 'Ladder', value: 'ladder' },
    { label: 'Pressure Washer', value: 'pressure_washer' },
  ];

  const handleHireNow = () => {
    if (selectedEquipment.value) {
      alert(`Hiring ${selectedEquipment.label}`);
    } else {
      alert('Please select equipment before hiring');
    }
  };

  const renderOption = ({ item }: { item: EquipmentOption }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => {
        setSelectedEquipment(item);
        setModalVisible(false);
      }}
    >
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.box}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.cost}>Cost to hire: {cost}</Text>
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
          <Text>{selectedEquipment.label}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <FlatList
              data={equipmentOptions}
              renderItem={renderOption}
              keyExtractor={(item) => item.value}
            />
          </View>
        </Modal>

        <TouchableOpacity
          style={[styles.button, !selectedEquipment.value && styles.disabledButton]}
          onPress={handleHireNow}
          disabled={!selectedEquipment.value}
        >
          <Text style={styles.buttonText}>Hire Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  box: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#F9F9F9',
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#5AE4A8',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    width: '100%',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default EquipmentDetailScreen;
