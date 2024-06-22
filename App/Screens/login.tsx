import { NavigationProp, useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../Firebase/FirebaseConfig';
import { RootStackParamList } from './Navigation/navigationTypes'; // Adjust the path according to your file structure

type LoginScreenNavigationProp = NavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email.trim(), password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .then(() => {
      alert("Login successful! 🎉");
      navigation.navigate('Home'); // Navigate to the Home screen or any other screen
    })
    .catch((err: any) => {
      alert(err.message);
    });
  };

  const handleResetPassword = () => {
    navigation.navigate('ResetPassword');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Hello, Welcome Back</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupContainer} onPress={handleResetPassword}>
          <Text style={styles.signupText}>
            Forgot Password? <Text style={styles.signupLink}>Reset</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    padding: 55,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  container: {
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 3,
  },
  input: {
    height: 60,
    borderColor: '#000',
    borderWidth: 0.5,
    borderRadius: 15,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#5AE4A8',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  signupContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#000',
  },
  signupLink: {
    color: '#5AE4A8',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
