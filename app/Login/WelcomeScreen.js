import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0066FF" />
      
      <View style={styles.topContainer}>
        <Text style={styles.title}>Welcome To</Text>
        <Text style={styles.logo}>
          ONEG<Text style={styles.logoO}>O</Text>V
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonWhite} onPress={() => navigation.navigate('Create')}>
          <Text style={styles.buttonTextBlue}>Create New Account</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buttonWhite} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonTextBlue}>Login</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.terms}>
        By creating an account or signing you agree to our 
        <Text style={styles.link}> Terms and Conditions</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066FF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50
  },
  topContainer: {
    alignItems: 'center',
    marginTop: 80
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10
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
  buttonContainer: {
    width: '100%',
    alignItems: 'center'
  },
  buttonWhite: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    width: '85%',
    alignItems: 'center',
    marginVertical: 10
  },
  buttonTextBlue: {
    color: '#0066FF',
    fontSize: 16,
    fontWeight: '600'
  },
  terms: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10
  },
  link: {
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  }
});
