import axios from 'axios';

// Define the base URL for the API
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // URL of your backend service
});

// Define the type for an Order
export interface Order {
  id: number;
  title: string;
  category: string;
  cost: string;
  hirerInfo: string;
  contact: string;
  location: string;
  availability: string;
  toolInfo: string;
  terms: string;
  equipment: string;
  type: string;
}

// Fetch orders from the backend
export const fetchOrders = () => api.get<Order[]>('/orders');
