import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({});

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput style={styles.input} placeholder="Full Name" onChangeText={(val) => handleChange('name', val)} />
        <TextInput style={styles.input} placeholder="NIC" onChangeText={(val) => handleChange('nic', val)} />
        <TextInput style={styles.input} placeholder="Date of Birth" onChangeText={(val) => handleChange('dob', val)} />
        <TextInput style={styles.input} placeholder="Mobile Number" keyboardType="phone-pad" onChangeText={(val) => handleChange('mobile', val)} />
        <TextInput style={styles.input} placeholder="Email Address" keyboardType="email-address" onChangeText={(val) => handleChange('email', val)} />
        <TextInput style={styles.input} placeholder="Gender" onChangeText={(val) => handleChange('gender', val)} />
        <TextInput style={styles.input} placeholder="Address" onChangeText={(val) => handleChange('address', val)} />
        <TextInput style={styles.input} placeholder="District" onChangeText={(val) => handleChange('district', val)} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(val) => handleChange('password', val)} />
        <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry onChangeText={(val) => handleChange('confirmPassword', val)} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OTP')}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066FF',
  },
  scrollContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 50
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F4C430',
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 12
  },
  button: {
    backgroundColor: '#0066FF',
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 15,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  }
});
