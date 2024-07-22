import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RootStackParamList } from '../Navigation/navigationTypes';

type RentEquipmentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RentEquipment'>;

const RentEquipmentScreen: React.FC = () => {
  const navigation = useNavigation<RentEquipmentScreenNavigationProp>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartDatePicker, setIsStartDatePicker] = useState(true);

  const showDatePicker = (isStart: boolean) => {
    setIsStartDatePicker(isStart);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    if (isStartDatePicker) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    hideDatePicker();
  };

  const calculateCost = () => {
    if (!startDate || !endDate) return 0;
    const days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    return days * 100;
  };

  const proceedToPayment = () => {
    const cost = calculateCost();
    navigation.navigate('PaymentScreen', { startDate, endDate, cost });
  };

  return (
    <View style={styles.container}>
      <Button title="Select Start Date" onPress={() => showDatePicker(true)} />
      <Button title="Select End Date" onPress={() => showDatePicker(false)} />
      <Text>Start Date: {startDate ? startDate.toDateString() : 'Not selected'}</Text>
      <Text>End Date: {endDate ? endDate.toDateString() : 'Not selected'}</Text>
      <Text>Total Cost: ${calculateCost()}</Text>
      <Button title="Proceed to Payment" onPress={proceedToPayment} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default RentEquipmentScreen;
