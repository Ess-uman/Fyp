import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';
import { RootStackParamList } from '../Navigation/navigationTypes';

type DateTimeSelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DateTimeSelection'>;

const DateTimeSelectionScreen = () => {
  const [bookDelivery, setBookDelivery] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedPickUpDate, setSelectedPickUpDate] = useState('');
  const [selectedReturnDate, setSelectedReturnDate] = useState('');
  const navigation = useNavigation<DateTimeSelectionScreenNavigationProp>();
  const pricePerDay = 50;

  const onDayPress = (day: DateObject) => {
    if (!selectedPickUpDate) {
      setSelectedPickUpDate(day.dateString);
    } else if (!selectedReturnDate) {
      if (day.dateString < selectedPickUpDate) {
        Alert.alert("Invalid Date", "Return date cannot be before pick-up date.");
      } else {
        setSelectedReturnDate(day.dateString);
      }
    } else if (day.dateString === selectedPickUpDate) {
      setSelectedPickUpDate('');
    } else if (day.dateString === selectedReturnDate) {
      setSelectedReturnDate('');
    } else {
      Alert.alert("Selection Limit", "You can only select two dates: pick-up and return.");
    }
  };

  const handleBooking = () => {
    if (selectedPickUpDate && selectedReturnDate && selectedOption) {
      navigation.navigate('Payment', {
        selectedOption,
        selectedPickUpDate,
        selectedReturnDate,
        bookDelivery,
        price: pricePerDay,
      });
    } else {
      Alert.alert("Booking", "Please select both pick-up and return dates, and choose either pick-up or delivery.");
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedPickUpDate]: { selected: true, selectedColor: 'blue' },
          [selectedReturnDate]: { selected: true, selectedColor: 'green' }
        }}
        style={styles.calendar}
        theme={{
          todayTextColor: '#00adf5',
          arrowColor: '#00adf5',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
        }}
      />
      <View style={styles.optionsContainer}>
        <Text style={styles.header}>Select Service</Text>
        <View style={styles.optionButtons}>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'Pick-Up' && styles.selectedOption]}
            onPress={() => setSelectedOption('Pick-Up')}
          >
            <Ionicons name="car" size={24} color={selectedOption === 'Pick-Up' ? '#ffffff' : '#000000'} />
            <Text style={selectedOption === 'Pick-Up' ? styles.selectedOptionText : styles.optionText}>Pick-Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, selectedOption === 'Delivery' && styles.selectedOption]}
            onPress={() => setSelectedOption('Delivery')}
          >
            <Ionicons name="bicycle" size={24} color={selectedOption === 'Delivery' ? '#ffffff' : '#000000'} />
            <Text style={selectedOption === 'Delivery' ? styles.selectedOptionText : styles.optionText}>Delivery</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Include Delivery</Text>
          <Switch
            value={bookDelivery}
            onValueChange={setBookDelivery}
          />
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  calendar: {
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 80,
  },
  optionsContainer: {
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  selectedOption: {
    backgroundColor: '#5AE4A8',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  selectedOptionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#ffffff',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 18,
  },
  bookButton: {
    backgroundColor: '#5AE4A8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DateTimeSelectionScreen;
