// api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Adjust the URL as needed

export const createOrder = (orderData: any) => {
  return axios.post(`${API_URL}/orders`, orderData);
};

export const makePayment = (paymentData: any) => {
  return axios.post(`${API_URL}/pay`, paymentData);
};
