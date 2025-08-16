import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ServiceOption {
  id: string;
  title: string;
  onPress: () => void;
}

const CitizenIdentification: React.FC = () => {
const navigation = useNavigation();
  const handleServicePress = (serviceName: string) => {
    console.log(`Pressed: ${serviceName}`);
    
    if (serviceName === 'NIC') {
      navigation.navigate('NIC' as never);
    }
  };

  const serviceOptions: ServiceOption[] = [
    {
      //when the user presses NIC it will navigate to the NIC screen
      id: 'nic',
      title: 'NIC',
      onPress: () => handleServicePress('NIC'),
    },
    {
      id: 'death_certificate',
      title: 'Death Certificate',
      onPress: () => handleServicePress('Death Certificate'),
    },
    {
      id: 'birth_certificate',
      title: 'Birth Certificate',
      onPress: () => handleServicePress('Birth Certificate'),
    },
    {
      id: 'marriage',
      title: 'Marriage',
      onPress: () => handleServicePress('Marriage'),
    },
  ];

  const renderServiceButton = (option: ServiceOption) => (
    <TouchableOpacity
      key={option.id}
      style={styles.serviceButton}
      onPress={option.onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.serviceButtonText}>{option.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.appName}>Citizen Identification</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        
        <Text style={styles.question}>Where do you want to go?</Text>
        
        <View style={styles.servicesContainer}>
          {serviceOptions.map(renderServiceButton)}
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 35,
    color: '#007AFF',
    fontWeight: '300',
  },
  appName: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 40,
  },
  question: {
    fontSize: 18,
    color: '#007AFF',
    marginBottom: 30,
    fontWeight: '500',
  },
  servicesContainer: {
    gap: 15,
  },
  serviceButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  activeNavItem: {
    // Active state styling
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  navLabel: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  activeNavLabel: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default CitizenIdentification; 