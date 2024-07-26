import React, { createContext, ReactNode, useContext, useState } from 'react';

interface Order {
  title: string;
  image: any;
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

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (order: Order) => {
    setOrders([...orders, order]);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};
