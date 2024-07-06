import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfileScreen: React.FC = () => {
  // Replace with actual user profile data fetching and display logic
  const userProfile = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phoneNumber: '+1234567890',
    location: 'City, Country',
    userType: 'Hirer', // or 'Renter'
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Profile</Text>
      <View style={styles.profileItem}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{userProfile.name}</Text>
      </View>
      <View style={styles.profileItem}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userProfile.email}</Text>
      </View>
      <View style={styles.profileItem}>
        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{userProfile.phoneNumber}</Text>
      </View>
      <View style={styles.profileItem}>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{userProfile.location}</Text>
      </View>
      <View style={styles.profileItem}>
        <Text style={styles.label}>User Type:</Text>
        <Text style={styles.value}>{userProfile.userType}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
  },
});

export default ProfileScreen;
