// src/screens/Dashboard.tsx
import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useNavigation } from '@react-navigation/native';


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
  const navigation = useNavigation();
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
          <TouchableOpacity key={index} style={styles.card} onPress={()=> navigation.navigate('CitizenID' as never)}>
            <Ionicons name={service.icon} size={40} color="#007BFF" />
            <Text style={styles.cardText}>{service.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  </ScrollView>

  {/* Bottom Navigation - 4 demo icons */}
  <View style={styles.bottomNav}>
    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Settings' as never)}>
      <Ionicons name="settings" size={24} color="#F4C430" />
      <Text style={styles.navLabel}>Settings</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard' as never)}>
      <Ionicons name="grid-outline" size={24} color="#007BFF" />
      <Text style={styles.navLabel}>Services</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AI' as never)}>
      <Ionicons name="mail-outline" size={24} color="#F4C430" />
      <Text style={styles.navLabel}>ONEGOV AI</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="person-outline" size={24} color="#F4C430" />
      <Text style={styles.navLabel}>Profile</Text>
    </TouchableOpacity>
  </View>
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
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  navLabel: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
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
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 64,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e5e5e5',
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -2 },
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
