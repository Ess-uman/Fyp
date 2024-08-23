import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { RootStackParamList } from './Navigation/navigationTypes';

type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;

const PaymentScreen: React.FC = () => {
  const route = useRoute<PaymentScreenRouteProp>();
  const navigation = useNavigation();
  const { title, image, category, cost, hirerInfo, contact, selectedEquipment, selectedType } = route.params;

  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();
  const [isDelivery, setIsDelivery] = useState<boolean>(false);

  const handlePayment = () => {
    // Implement payment processing here
    navigation.navigate('Orders'); // Navigate to the Orders screen after payment
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.detailsBox}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.cost}>Cost: {cost}</Text>
          <Text style={styles.detail}>Equipment: {selectedEquipment?.label || 'Not selected'}</Text>
          <Text style={styles.detail}>Type: {selectedType || 'Not selected'}</Text>
        </View>
      </View>

      <View style={styles.calendarContainer}>
        <Text style={styles.sectionTitle}>Select Dates</Text>
        <Calendar
          markedDates={{
            [startDate || '']: { startingDay: true, color: '#5AE4A8', textColor: '#fff' },
            [endDate || '']: { endingDay: true, color: '#5AE4A8', textColor: '#fff' },
          }}
          onDayPress={(day) => {
            if (!startDate) {
              setStartDate(day.dateString);
            } else if (!endDate) {
              setEndDate(day.dateString);
            } else {
              setStartDate(day.dateString);
              setEndDate(undefined);
            }
          }}
        />
      </View>

      <View style={styles.deliveryContainer}>
        <Text style={styles.sectionTitle}>Delivery Option</Text>
        <TouchableOpacity
          style={[styles.optionButton, isDelivery && styles.selectedOption]}
          onPress={() => setIsDelivery(true)}
        >
          <Text style={styles.optionText}>Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, !isDelivery && styles.selectedOption]}
          onPress={() => setIsDelivery(false)}
        >
          <Text style={styles.optionText}>Pickup</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handlePayment}
      >
        <Text style={styles.buttonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  detailsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#F9F9F9',
    marginBottom: 15,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DDD',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 18,
    color: '#888',
    marginBottom: 5,
  },
  cost: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  calendarContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#F9F9F9',
  },
  deliveryContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  selectedOption: {
    backgroundColor: '#5AE4A8',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#5AE4A8',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default PaymentScreen;
