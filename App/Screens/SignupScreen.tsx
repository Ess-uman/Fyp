import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../Firebase/FirebaseConfig';
import { RootStackParamList } from './Navigation/navigationTypes'; // Adjust the path according to your file structure

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const navigation = useNavigation<SignupScreenNavigationProp>();

  const handleSignup = async () => {
    await createUserWithEmailAndPassword(auth, email.trim(), password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .then(() => {
      alert("Account created successfully 🎉");
      navigation.navigate('Login');
    })
    .catch((err: any) => {
      alert(err);
    });
  };
 function SignupScreen(){}
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
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
});

export default SignupScreen;
