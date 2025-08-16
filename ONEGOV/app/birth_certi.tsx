import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get("window");

export default function BirthCertificateScreen() {
  const [selectedId, setSelectedId] = useState("1234");
  const [isOriginal, setIsOriginal] = useState(true);
  const navigation = useNavigation();
  

  const certificates = [
    { id: "1234", name: "Lucas scott" },
    { id: "9876", name: "Saman Appu" },
  ];

  return (
  <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.container}>
    
            {/* Top Navigation Bar */}
            <View style={styles.navBar}>
              <TouchableOpacity>
                <Text style={styles.cancelNav}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.navTitle}>Application for NIC</Text>
              <View style={{ width: 50 }} /> {/* Spacer */}
            </View>
    
            {/* Progress Step Bar */}
            <View style={styles.stepBar}>
              {["NIC Form", "Birth certificate", "Photo", "Request"].map((label, index) => (
                <View key={index} style={styles.stepItem}>
                  <View
                    style={[
                      styles.stepCircle,
                      index < 2
                        ? { backgroundColor: "#166EFF" }
                        : { backgroundColor: "#FBBC05" },
                    ]}
                  >
                    {index < 2 ? (
                      <Ionicons name="checkmark" size={14} color="#fff" />
                    ) : (
                      // This is the last step, so show the number
                      <Text style={styles.stepNumber}>3</Text>
                      // Change to 4 if you want to show the last step as 4
                    )}
                  </View>
                  <Text style={styles.stepLabel}>{label}</Text>
                </View>
              ))}
            </View>

        {/* Title */}
        <Text style={styles.sectionTitle}>Attach your Birth certificate</Text>
        <Text style={styles.sectionSubtitle}>
          Please make sure to attach your original Birth certificate or extract
          of the birth registry certified by the Additional District Registrar.
        </Text>

        {/* Certificate List */}
        <Text style={styles.subHeader}>Birth Certificates</Text>
        {certificates.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.certificateCard,
              selectedId === item.id && styles.certificateSelected,
            ]}
            onPress={() => setSelectedId(item.id)}
          >
            <Text style={styles.certificateName}>{item.name}</Text>
            <Text style={styles.certificateNumber}>
              xxxx xxxx xxxx {item.id}
            </Text>
            {selectedId === item.id && (
              <Ionicons
                name="checkmark-circle"
                size={22}
                color="#007bff"
                style={styles.checkIcon}
              />
            )}
          </TouchableOpacity>
        ))}

        {/* Add New */}
        <TouchableOpacity style={styles.addNewBtn} onPress={() => navigation.navigate('AddBirthCert' as never)}>
          <Text style={styles.addNewText}>+ Add new Birth Certificate</Text>
        </TouchableOpacity>

        {/* Original / Extract Options */}
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setIsOriginal(!isOriginal)}
        >
          <Ionicons
            name={isOriginal ? "checkbox" : "square-outline"}
            size={22}
            color="#007bff"
          />
          <Text style={styles.checkboxLabel}>
            Confirm this is the Original legal birth certificate
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxRow}>
          <Ionicons name="ellipse-outline" size={22} color="#aaa" />
          <Text style={styles.checkboxLabel}>
            Add a extract Of your Birth certificate
          </Text>
        </TouchableOpacity>

        {/* Continue Button */}
        
        <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('Photo' as never)}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cancel: {
    color: "#007bff",
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
    navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#fff",
    elevation: 3,
  },
  cancelNav: {
    color: "#166EFF",
    fontSize: 15,
    fontWeight: "500",
  },
  navTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  stepBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    paddingVertical: 16,
  },
  stepItem: {
    alignItems: "center",
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  stepNumber: {
    color: "#fff",
    fontWeight: "700",
  },
  stepLabel: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  stepsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 50,
  },
  stepDone: {
    width: 24,
    height: 24,
    borderRadius: 10,
    backgroundColor: "#4dabf7",
  },
  stepCurrent: {
    width: 24,
    height: 24,
    borderRadius: 10,
    backgroundColor: "#f6c23e",
  },
  stepPending: {
    width: 24,
    height: 24,
    borderRadius: 10,
    backgroundColor: "#f6c23e",
  },
    container: {
    paddingBottom: 30,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  certificateCard: {
    width: width - 32,
    height: 80,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#f1f3f5",
    marginBottom: 10,
    position: "relative",
  },
  certificateSelected: {
    backgroundColor: "#e7f1ff",
    borderColor: "#007bff",
    borderWidth: 1,
  },
  certificateName: {
    fontSize: 16,
    fontWeight: "500",
  },
  certificateNumber: {
    fontSize: 14,
    color: "#666",
  },
  checkIcon: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  addNewBtn: {
    marginVertical: 10,
  },
  addNewText: {
    color: "#007bff",
    fontWeight: "500",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    marginLeft: 17,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
    flexWrap: "wrap",
    textAlign: "center"
  },
  continueBtn: {
    width: width * 0.85,
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 30,
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
