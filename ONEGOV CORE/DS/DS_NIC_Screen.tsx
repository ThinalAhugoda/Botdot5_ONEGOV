import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Normal_requests from './Normal_requests';
import Oneday_requests from './Oneday_requests';

const DS_NIC_Screen = () => {
  const [currentScreen, setCurrentScreen] = useState<'main' | 'oneday' | 'normal'>('main');

  if (currentScreen === 'oneday') {
    return <Oneday_requests />;
  }

  if (currentScreen === 'normal') {
    return <Normal_requests />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NIC Requests</Text>
      <Text style={styles.subtitle}>Service types</Text>

      <TouchableOpacity
        style={styles.buttonBlue}
        onPress={() => setCurrentScreen('oneday')}
      >
        <Text style={styles.buttonText}>One Day Service</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonYellow}
        onPress={() => setCurrentScreen('normal')}
      >
        <Text style={styles.buttonText}>Normal Service</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonBlue: {
    backgroundColor: '#003DA5',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonYellow: {
    backgroundColor: '#FFC107',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default DS_NIC_Screen;
