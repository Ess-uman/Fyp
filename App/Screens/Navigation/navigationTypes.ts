
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

  EquipmentDetail: {
      title: string;
      image: any;
      category: string;
      cost: string;
      hirerInfo: string;
      contact: string;
      Orders: string;
      location: string;
      availability: string;
      toolInfo: string;
      terms: string;
      startDate:string;
      endDate: string;
      totalCost: string;
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
    DateSelectionTimeScreen: {
      startDate: Date | null;
      endDate: Date | null;
      cost: number
    };
   DateSelectionTime: undefined;

  };
