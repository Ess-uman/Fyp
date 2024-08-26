
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

    EquipmentDetailsScreen: {
      title: string;
      image: any;
      category: string;
      cost: string;
      hirerInfo: string;
      contact: string;
      selectedEquipment?: {
        label: string;
        value: string;
      };
      selectedType?: string;
    };
    EquipmentDetail: {
      title: string;
      image: string;
      category: string;
      cost: string;
      hirerInfo: string;
      contact: string;
    };

    RentEquipment:{
      startDate: string;
      endDate: string;
      cost: string;
      Screen: string;
    }
    Payment: {
        title: string;
        image: any;
        category: string;
        cost: string;
        hirerInfo: string;
        contact: string;
        SelectedType: string,
        selectedEquipment: {
          label: string;
          value: string;
        } | null;
        selectedType: string | null;
    };
    DateTimeSelectionScreen: undefined;
      cost: number;
    };
