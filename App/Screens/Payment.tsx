import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const Payment = () => {
  const route = useRoute();
  const { selectedEquipment, selectedType, cost, image, category } = route.params;

  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [isDelivery, setIsDelivery] = useState<boolean | null>(null);

  useEffect(() => {
    if (startDate && endDate) {
      const start = moment(startDate);
      const end = moment(endDate);
      const days = end.diff(start, 'days') + 1;
      setTotalCost(days * cost);
    } else {
      setTotalCost(0);
    }
  }, [startDate, endDate]);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.detailsBox}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{selectedEquipment?.label || 'Not selected'}</Text>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.cost}>Cost per day: {cost} GHS</Text>
          <Text style={styles.detail}>Type: {selectedType || 'Not selected'}</Text>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.option, isDelivery === false && styles.selectedOption]}
          onPress={() => setIsDelivery(false)}
        >
          <Text style={[styles.optionText, isDelivery === false && styles.selectedOptionText]}>Pickup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, isDelivery === true && styles.selectedOption]}
          onPress={() => setIsDelivery(true)}
        >
          <Text style={[styles.optionText, isDelivery === true && styles.selectedOptionText]}>Delivery</Text>
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

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Booking Summary</Text>
        <View style={styles.summaryDetail}>
          <Text style={styles.summaryLabel}>Start Date:</Text>
          <Text style={styles.summaryValue}>{startDate || 'Not selected'}</Text>
        </View>
        <View style={styles.summaryDetail}>
          <Text style={styles.summaryLabel}>End Date:</Text>
          <Text style={styles.summaryValue}>{endDate || 'Not selected'}</Text>
        </View>
        <View style={styles.summaryDetail}>
          <Text style={styles.summaryLabel}>Total Cost:</Text>
          <Text style={styles.summaryValue}>{totalCost} GHS</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.proceedButton}>
        <Text style={styles.proceedButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: '#fff',
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
  summaryContainer: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  summaryDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    paddingVertical: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
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

export default Payment;
