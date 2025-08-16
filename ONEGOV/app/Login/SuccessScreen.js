import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SuccessScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.success}>Successfully Verified!</Text>
      <Text style={styles.succes}>Your Phone Number has been successfully verified</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  success: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f4c430'
  },
  succes: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center'
  }
});
