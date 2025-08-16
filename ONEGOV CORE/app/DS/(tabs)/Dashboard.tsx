// src/screens/Dashboard.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Service {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const services: Service[] = [
  { title: 'Citizen Identification', icon: 'person' },
  { title: 'Transportation', icon: 'compass' },
  { title: 'Business & Tax', icon: 'mail' },
  { title: 'Education', icon: 'school' },
  { title: 'Agriculture', icon: 'leaf' },
  { title: 'Health', icon: 'medkit' },
];

export default function Dashboard() {
  const router = useRouter();

  const handleServicePress = (serviceTitle: string) => {
    if (serviceTitle === 'Citizen Identification') {
      router.push('./DS_NIC_Screen');
    }
    // Add other service navigation logic here if needed
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.container}>
          {/* Top Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Dashboard</Text>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#999" />
            <TextInput style={styles.searchInput} placeholder="Search Service" />
          </View>

          {/* Services Grid */}
          <ScrollView contentContainerStyle={styles.grid}>
            {services.map((service, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.card} 
                onPress={() => handleServicePress(service.title)}
              >
                <Ionicons name={service.icon} size={40} color="#007BFF" />
                <Text style={styles.cardText}>{service.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Add safeArea to StyleSheet.create
// This is a common pattern for SafeAreaView styles in React Native
// It ensures content is not obscured by device notches or status bars
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F3F3',
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 20,
    height: 45,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardText: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
