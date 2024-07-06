
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  Welcome: undefined;
  ResetPassword: undefined;
  Home: undefined;
  category: undefined;
  settings:undefined;
  RentDatePicker:undefined;
  CategoryEquipment: { category: string };
  EquipmentDetail: {
      title: string;
      image: any;
      category: string;
      cost: string;
      hirerInfo: string;
      contact: string;
    };
  };
