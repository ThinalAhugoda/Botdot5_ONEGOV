import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0066FF" />

      <View style={styles.topSection}>
        <Text style={styles.logo}>
          ONEG<Text style={styles.logoO}>O</Text>V
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.loginTitle}>Login Account</Text>

        <TextInput style={styles.input} placeholder="NIC" placeholderTextColor="#999" />
        <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="#999" keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#999" secureTextEntry />

        <TouchableOpacity style={styles.buttonBlue} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.buttonTextWhite}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          By creating an account or signing you agree to our 
          <Text style={styles.link}> Terms and Conditions</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066FF'
  },
  topSection: {
    alignItems: 'center',
    marginTop: 50
  },
  logo: {
    fontSize: 38,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 2
  },
  logoO: {
    color: '#F4C430'
  },
  formContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 30,
    paddingHorizontal: 25,
    marginTop: 30,
    flex: 1,
    alignItems: 'center'
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F4C430',
    marginBottom: 20
  },
  input: {
    backgroundColor: '#f9f9f9',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  buttonBlue: {
    backgroundColor: '#0066FF',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 15
  },
  buttonTextWhite: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  },
  terms: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginTop: 25
  },
  link: {
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  }
});
