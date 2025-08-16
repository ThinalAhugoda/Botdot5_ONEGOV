import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface FeeOption {
  id: string;
  title: string;
  subtitle: string;
  price: number;
}

const fees: FeeOption[] = [
  { id: '1', title: 'NIC registration first time', subtitle: 'new NIC', price: 200 },
  { id: '2', title: 'One Day service Fees', subtitle: 'new NIC', price: 2000 },
];

const SelectFeesScreen = () => {
  const [selectedFee, setSelectedFee] = useState<FeeOption | null>(fees[1]); // Default second selected
  const navigation = useNavigation();

  const handleSelect = (item: FeeOption) => {
    setSelectedFee(item);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Select Divisional{'\n'}secretariat office{'\n'}FEES</Text>
        </View>

        {/* Fee Options */}
        <FlatList
          data={fees}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.feeCard, selectedFee?.id === item.id && styles.selectedCard]}
              onPress={() => handleSelect(item)}
            >
              <View style={styles.imagePlaceholder}>
                <Image
                  source={{ uri: 'https://via.placeholder.com/50' }} // Placeholder image
                  style={styles.image}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
              <Text style={styles.price}>LKR {item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        {/* Total Section */}
        <View style={styles.totalContainer}>
          <Text style={styles.notice}>You won't be charged until you review the order on the next page</Text>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>LKR {selectedFee?.price.toFixed(2)}</Text>
          </View>
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Pay' as never)}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SelectFeesScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  headerContainer: {
    width: '100%' ,
    backgroundColor: "#007bff",
    paddingVertical: 65,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 34,
  },
  feeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#1976F3',
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  image: {
    width: 40,
    height: 40,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  totalContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  notice: {
    fontSize: 13,
    color: '#888',
    marginBottom: 8,
    textAlign: 'center',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  totalLabel: {
    fontSize: 16,
    color: '#000',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  checkoutButton: {
    backgroundColor: '#1976F3',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  checkoutText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelText: {
    textAlign: 'center',
    color: '#FFC107',
    fontSize: 15,
    fontWeight: '500',
  },
});
