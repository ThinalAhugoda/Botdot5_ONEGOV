import { database } from "@/lib/appwrite";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ID, Permission, Role } from "react-native-appwrite";
import { Text } from "react-native-paper";

const DATABASE_ID = "689dcd030009014fa515";
const COLLECTION_ID = "689f8a390016d939ba23";

export default function DSForm() {
  const { docId } = useLocalSearchParams<{ docId: string }>();
  const router = useRouter();
  const [officerName, setOfficerName] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!officerName || !confirmation) {
      setError("Please fill in all fields and confirm.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          OfficerName: officerName,
          Confirmation: confirmation,
          ApprovalStatus: true,
          citizenId: docId,
        },
        [
          Permission.write(Role.any()),
          Permission.read(Role.any()),
          Permission.update(Role.any()),
          Permission.delete(Role.any()),
        ]
      );
      
      alert("DS Form submitted successfully!");
      router.replace('/DS/(tabs)/DS_NIC_Screen');
    } catch (error: any) {
      console.error("Error submitting form:", error.message || error);
      setError(`Failed to submit form: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>DS Form</Text>

      <Text style={styles.label}>1. Name of the Certifying Officer</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter here"
        value={officerName}
        onChangeText={setOfficerName}
      />

      <View style={styles.switchRow}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setConfirmation(!confirmation)}
        >
          {confirmation && <Text>✔️</Text>}
        </TouchableOpacity>
        <Text style={{ marginLeft: 8 }}>
          Confirm this is the Original legal birth certificate
        </Text>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.rejectButton} onPress={() => router.back()}>
        <Text style={styles.rejectText}>Reject</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  label: { fontWeight: "600", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  switchRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  checkbox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#001F54",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  submitText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  rejectButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 12,
  },
  rejectText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  errorText: { color: "red", textAlign: "center", marginTop: 10 },
});
