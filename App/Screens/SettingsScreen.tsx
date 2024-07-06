import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const SettingsScreen: React.FC = () => {
  const [notificationEnabled, setNotificationEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const navigation = useNavigation();

  const handleNotificationToggle = () => {
    setNotificationEnabled(!notificationEnabled);
  };

  const handleDarkModeToggle = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  const handleLogout = () => {
    // Implement logout functionality here
  };

  const handleEditProfile = () => {
    navigation.navigate('Profile'); // Navigate to ProfileScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Settings</Text>

      <TouchableOpacity style={styles.optionContainer} onPress={handleEditProfile}>
        <Text style={styles.optionText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer}>
        <Text style={styles.optionText}>Notification Settings</Text>
        <Switch
          value={notificationEnabled}
          onValueChange={handleNotificationToggle}
          trackColor={{ false: '#767577', true: '#5AE4A8' }}
          thumbColor={notificationEnabled ? '#fff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer}>
        <Text style={styles.optionText}>Language & Region</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer}>
        <Text style={styles.optionText}>Privacy & Security</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer}>
        <Text style={styles.optionText}>App Theme</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={handleDarkModeToggle}
          trackColor={{ false: '#767577', true: '#5AE4A8' }}
          thumbColor={darkModeEnabled ? '#fff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer}>
        <Text style={styles.optionText}>Contact Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.optionContainer, styles.logoutButton]} onPress={handleLogout}>
        <Text style={[styles.optionText, { color: '#FF6347' }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1.,
    borderBottomColor: '#EFEFEF',
  },
  optionText: {
    fontSize: 18,
  },
  logoutButton: {
    marginTop: 20,
  },
});

export default SettingsScreen;
