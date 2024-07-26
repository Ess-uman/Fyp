import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { db } from './firebaseConfig';

const firebaseConfig = {
  apiKey: "AIzaSyBAa8sHH5-K9f_-IZ7s6Frs5PZBLBLjrmQ",
  authDomain: "farmrent-16104.firebaseapp.com",
  projectId: "farmrent-16104",
  storageBucket: "farmrent-16104.appspot.com",
  messagingSenderId: "108318426403",
  appId: "1:108318426403:web:c17e8748885256f529b896"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } else {
    await AsyncStorage.removeItem('user');
  }
});

const getCurrentUser = async () => {
  const userJson = await AsyncStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
};

export { auth, db, getCurrentUser };

interface Booking {
  userId: string;
  equipmentId: string;
  startDate: Date;
  endDate: Date;
  totalCost: number;
  status: string;
}

const createBooking = async (booking: Booking) => {
  try {
    await db.collection('bookings').add({
      ...booking,
      startDate: firebase.firestore.Timestamp.fromDate(booking.startDate),
      endDate: firebase.firestore.Timestamp.fromDate(booking.endDate),
    });
    console.log('Booking created successfully');
  } catch (error) {
    console.error('Error creating booking:', error);
  }
};