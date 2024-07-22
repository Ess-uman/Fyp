
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  Welcome: undefined;
  ResetPassword: undefined;
  Home: undefined;
  category: undefined;
  settings:undefined;
  OrdersScreen:undefined;
  OrdersContext:undefined;
  RentEquipmentScreen: undefined;
  CategoryEquipment: { category: string };
  Payment:undefined;
  EquipmentDetail: {
      title: string;
      image: any;
      category: string;
      cost: string;
      hirerInfo: string;
      contact: string;
      Orders?: string;
    };
    RentEquipment:{
      startDate: string;
      endDate: string;
      cost: string;
      Screen: string;
    }
    PaymentScreen: {
      startDate: Date | null;
      endDate: Date | null;
      cost: number;
    };
  };
