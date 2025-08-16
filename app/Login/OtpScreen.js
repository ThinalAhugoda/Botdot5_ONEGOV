import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function OtpScreen({ navigation }) {
  const [otp, setOtp] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Mobile Number</Text>
      <Text style={styles.subtitle}>Enter the 5-digit OTP sent to your phone</Text>

      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        maxLength={5}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Success')}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10
  },
  subtitle: {
    color: '#fff',
    marginBottom: 20
  },
  input: {
    backgroundColor: '#fff',
    width: '80%',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 20,
    letterSpacing: 10
  },
  button: {
    backgroundColor: '#F4C430',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 40
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000'
  }
});
