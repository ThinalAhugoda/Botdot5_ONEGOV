import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("window");

export default function End_QR() {
  const navigation = useNavigation();
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
          {["NIC Form", "Birth certificate", "Photo", "Request"].map(
            (label, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={styles.stepCircle}>
                  <Ionicons name="checkmark" size={14} color="#fff" />
                </View>
                <Text style={styles.stepLabel}>{label}</Text>
              </View>
            )
          )}
        </View>

        {/* Title & Info */}
        <Text style={styles.title}>Your one day service Token and the Date</Text>
        <Text style={styles.subtitle}>
          You request has been approved and successfully entered to the system, in
          order to collect your NIC Visit the Battaramulla or Galle branch of DRP
          and scan the QR code
        </Text>

        {/* Date Info */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Date: 2025/10/23</Text>
          <Text style={styles.infoText}>Time: 9.00am</Text>
          <Text style={styles.infoText}>Token: 12</Text>
        </View>

        {/* QR Code */}
        <View style={styles.qrContainer}>
          <QRCode
            value="Progress/QR.png"
            size={200}
          />
        </View>

        {/* Rate Your Experience */}
        <Text style={styles.rateLabel}>Rate Your experience</Text>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4].map((i) => (
            <Ionicons key={i} name="star" size={28} color="#166EFF" />
          ))}
          <Ionicons name="star-outline" size={28} color="#166EFF" />
        </View>

        {/* Finish Button */}
        <TouchableOpacity style={styles.finishButton} onPress={() => navigation.navigate("Dashboard" as never)}>
          <Text style={styles.finishText}>Finish</Text>
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
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#166EFF",
  },
  stepLabel: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 25,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 25,
  },
  infoBox: {
    marginTop: 15,
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
    marginVertical: 2,
  },
  qrContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
  },
  rateLabel: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
    marginTop: 15,
  },
  starsRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  finishButton: {
    backgroundColor: "#166EFF",
    width: width * 0.85,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
  },
  finishText: {
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
});
