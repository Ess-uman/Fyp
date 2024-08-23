import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const PaymentScreen = () => {
  const route = useRoute();
  const { selectedEquipment, selectedType, cost, image, category } = route.params;

  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [isDelivery, setIsDelivery] = useState<boolean | undefined>(undefined);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.orderDetailsTitle}>Order Details</Text>
      <View style={styles.detailsBox}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{selectedEquipment?.label || 'Not selected'}</Text>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.cost}>Cost: {cost}</Text>
          <Text style={styles.detail}>Type: {selectedType || 'Not selected'}</Text>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.option, !isDelivery && styles.selectedOption]}
          onPress={() => setIsDelivery(false)}
        >
          <Text style={[styles.optionText, !isDelivery && styles.selectedOptionText]}>Pickup</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, isDelivery && styles.selectedOption]}
          onPress={() => setIsDelivery(true)}
        >
          <Text style={[styles.optionText, isDelivery && styles.selectedOptionText]}>Delivery</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={{
            [startDate || '']: { selected: true, startingDay: true, color: '#5AE4A8', textColor: '#fff' },
            [endDate || '']: { selected: true, endingDay: true, color: '#5AE4A8', textColor: '#fff' },
          }}
          onDayPress={(day) => {
            if (!startDate || (startDate && endDate)) {
              setStartDate(day.dateString);
              setEndDate(undefined);
            } else if (!endDate) {
              if (day.dateString === startDate) {
                setStartDate(undefined);
                setEndDate(undefined);
              } else {
                setEndDate(day.dateString);
              }
            }
          }}
          style={styles.calendar}
        />
      </View>

      <TouchableOpacity style={styles.proceedButton} onPress={() => {/* Handle proceed to checkout */}}>
        <Text style={styles.proceedButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
  },
  orderDetailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 40,
  },
  detailsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#F9F9F9',
    marginBottom: 25,
    marginTop: 10,
  },
  imageContainer: {
    marginRight: 15,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    color: '#555',
  },
  cost: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 0.3,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
    shadowColor: '#555',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  selectedOption: {
    backgroundColor: '#5AE4A8',
    borderColor: '#5AE4A8',
  },
  optionText: {
    fontSize: 18,
    color: '#555',
  },
  selectedOptionText: {
    color: '#fff',
  },
  calendarContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  calendar: {
    borderRadius: 10,
  },
  proceedButton: {
    backgroundColor: '#5AE4A8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PaymentScreen;
