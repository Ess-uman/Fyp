import DateTimePicker from '@react-native-community/datetimepicker';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Switch, Text, View } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';
import { db } from '../../Firebase/FirebaseConfig';

const DateTimeSelectionScreen = ({ navigation }) => {
  const [bookDelivery, setBookDelivery] = useState(false);
  const [pickUpTime, setPickUpTime] = useState(new Date());
  const [returnTime, setReturnTime] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState({});
  const maxDays = 365; // Maximum length of one year
  const pricePerDay = 50; // Example price per day

  const onPickUpTimeChange = (event, selectedDate) => {
    setPickUpTime(selectedDate || pickUpTime);
  };

  const onReturnTimeChange = (event, selectedDate) => {
    setReturnTime(selectedDate || returnTime);
  };

  const handleBooking = async () => {
    const dates = Object.keys(selectedDates);
    if (dates.length > 0) {
      const price = dates.length * pricePerDay;
      try {
        await addDoc(collection(db, 'bookings'), {
          bookDelivery,
          pickUpTime: pickUpTime.toISOString(),
          returnTime: returnTime.toISOString(),
          selectedDates: dates,
          totalPrice: price,
          createdAt: serverTimestamp()
        });
        Alert.alert("Booking Successful", `You have selected ${dates.length} days. The total price is $${price}.`);
      } catch (error) {
        Alert.alert("Booking Error", "An error occurred while processing your booking. Please try again.");
      }
    } else {
      Alert.alert("Booking", "Please select at least one day.");
    }
  };

  const onDayPress = (day: DateObject) => {
    let newSelectedDates = { ...selectedDates };

    if (newSelectedDates[day.dateString]) {
      delete newSelectedDates[day.dateString];
    } else {
      if (Object.keys(newSelectedDates).length < maxDays) {
        newSelectedDates[day.dateString] = { selected: true, marked: true };
      } else {
        Alert.alert("Selection Limit", `You can select a maximum of ${maxDays} days.`);
      }
    }

    setSelectedDates(newSelectedDates);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Date & Time</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Book Delivery</Text>
        <Switch
          value={bookDelivery}
          onValueChange={setBookDelivery}
        />
      </View>
      <Calendar
        onDayPress={onDayPress}
        markedDates={selectedDates}
        style={styles.calendar}
        theme={{
          todayTextColor: '#00adf5',
          arrowColor: '#00adf5',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
        }}
      />
      <View style={styles.timePickerContainer}>
        <Text style={styles.timePickerLabel}>Pick-up Time</Text>
        <DateTimePicker
          value={pickUpTime}
          mode="time"
          display="default"
          onChange={onPickUpTimeChange}
        />
        <Text style={styles.timePickerLabel}>Return Time</Text>
        <DateTimePicker
          value={returnTime}
          mode="time"
          display="default"
          onChange={onReturnTimeChange}
        />
      </View>
      <Button title="Book Now" onPress={handleBooking} />
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
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderRadius: 10,
  },
  switchLabel: {
    fontSize: 18,
  },
  calendar: {
    borderRadius: 20,
    marginBottom: 20,
  },
  timePickerContainer: {
    marginTop: 16,
  },
  timePickerLabel: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default DateTimeSelectionScreen;
