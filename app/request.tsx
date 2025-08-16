import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("window");

export default function PhotoStepScreen() {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState("1234");
  const [isOriginal, setIsOriginal] = useState(true);
  const certificates = [
    { id: "1234", name: "Lucas scott" }]

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
                  index < 3
                    ? { backgroundColor: "#166EFF" }
                    : { backgroundColor: "#166EFF" },
                ]}
              >
                {index < 3 ? (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                ) : (
                  <Text style={styles.stepNumber}>4</Text>
                )}
              </View>
              <Text style={styles.stepLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Title */}
        <Text style={styles.title}>Check your files before applying</Text>
        <Text style={styles.subtitle}>
          Please make sure you fill and to attach :
          {"\n"}
          1. NIC application form
          {"\n"}
          2. Original Birth Certificate
          {"\n"}
          3. Photo studio slip
        </Text>

        {/* Upload Box */}
        <View style={styles.uploadCard}>
          {/* First Row */}
          <Text style={styles.label}>NIC application Form</Text>
          <TouchableOpacity style={styles.label} onPress={() => navigation.navigate('NIC_form' as never)}>
          <View style={styles.inputRow}>
            <Text style={styles.labelText}>Edit Form</Text>
          </View>
          </TouchableOpacity>

          {/* Second Row */}
          <Text style={styles.label}>Original Birth Certificate</Text>
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


          {/* Image Preview */}
          <Text style={styles.label}>Photo studio slip</Text>
          <TouchableOpacity style={styles.imageBox} >
            <Ionicons name="image" size={40} color="#166EFF" />
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('Select' as never)}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>

        {/* Cancel */}
        <TouchableOpacity>
          <Text style={styles.cancelText}>Cancel</Text>
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
  container: {
    paddingBottom: 30,
    alignItems: "center",
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
    borderRadius: 14,
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
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    textAlign: "justify",
    marginTop: 6,
    paddingHorizontal: 20,
  },
  uploadCard: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#166EFF",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    width: width * 0.85,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
  },
    labelText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 6,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#166EFF",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  imageBox: {
    height: width * 0.2,
    backgroundColor: "#a5c9ff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#166EFF",
    width: width * 0.85,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelText: {
    color: "#f1a100",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 12,
  },
  certificateCard: {
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
});

