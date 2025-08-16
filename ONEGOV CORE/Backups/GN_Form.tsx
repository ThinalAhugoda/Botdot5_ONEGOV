import { database } from "@/lib/appwrite";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ID, Permission, Role } from "react-native-appwrite";

const DATABASE_ID = "689dcd030009014fa515";
const COLLECTION_ID = "689f37640037b9e9b444";

export default function GN_Form() {
  const [officerName, setOfficerName] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [officerSignatureRank, setOfficerSignatureRank] = useState("");
  const [dsSignatureRank, setDsSignatureRank] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [originalBirthCertificateApprove, setOriginalBirthCertificateApprove] = useState(false);

  const handleSubmit = async () => {
    try {
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          OfficerName: officerName,
          Date: date.toISOString(),
          OfficerSignature_Rank: officerSignatureRank,
          DS_Signature_Rank: dsSignatureRank,
          FamilyName: familyName,
          Name: name,
          Surname: surname,
          Original_BirthCertificate_Approve: originalBirthCertificateApprove,
          Approval_Status: true,
        },
        [
          Permission.write(Role.any()),  // allow anyone to write (create)
          Permission.read(Role.any()),   // allow anyone to read
          Permission.update(Role.any()), // allow anyone to update
          Permission.delete(Role.any()), // optional: allow anyone to delete
        ]
      );
      alert("Form submitted successfully!");
    } catch (error: any) {
      console.error("Error submitting form:", error.message || error);
      alert(`Failed to submit form: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>GN Form</Text>
      </View>

      <Text style={styles.label}>1. Name of the Certifying Officer</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={officerName}
        onChangeText={setOfficerName}
      />

      <Text style={styles.label}>2. Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>3. Signature and official rank of the certifying officer</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter details"
        value={officerSignatureRank}
        onChangeText={setOfficerSignatureRank}
      />

      <Text style={styles.label}>4. Signature and official rank of the Divisional Secretary</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter details"
        value={dsSignatureRank}
        onChangeText={setDsSignatureRank}
      />

      <Text style={styles.label}>Family Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here"
        value={familyName}
        onChangeText={setFamilyName}
      />

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Surname</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here"
        value={surname}
        onChangeText={setSurname}
      />

      <View style={styles.switchRow}>
        <Switch
          value={originalBirthCertificateApprove}
          onValueChange={setOriginalBirthCertificateApprove}
        />
        <Text style={{ marginLeft: 8 }}>
          Confirm the Original Birth Certificate is approved
        </Text>
      </View>

      <Text style={styles.label}>QR Code</Text>
      <View style={styles.qrBox}>
        <Text>📷</Text>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { backgroundColor: "#002B5B", padding: 16, alignItems: "center" },
  headerText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  label: { fontSize: 14, fontWeight: "600", marginTop: 16, marginHorizontal: 16 },
  input: {
    borderWidth: 1, borderColor: "#ccc", borderRadius: 8,
    padding: 10, marginHorizontal: 16, marginTop: 8, backgroundColor: "#f9f9f9"
  },
  dateButton: {
    borderWidth: 1, borderColor: "#ccc", borderRadius: 8,
    padding: 12, marginHorizontal: 16, marginTop: 8, backgroundColor: "#f9f9f9"
  },
  switchRow: { flexDirection: "row", alignItems: "center", marginHorizontal: 16, marginTop: 16 },
  qrBox: {
    borderWidth: 1, borderColor: "#ccc", borderRadius: 8,
    height: 120, marginHorizontal: 16, marginTop: 8,
    backgroundColor: "#E0EBFF", alignItems: "center", justifyContent: "center"
  },
  submitButton: {
    backgroundColor: "#002B5B", borderRadius: 8, padding: 16,
    marginHorizontal: 16, marginTop: 24, alignItems: "center"
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
