import { database } from "@/lib/appwrite";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";

const DATABASE_ID = "689dcd030009014fa515";
const COLLECTION_ID = "689ec99600142d76d0b1";

export default function InfoApproveScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { docId } = route.params as { docId: string };

  const [doc, setDoc] = useState<any>(null);

  const fetchDocument = async () => {
    try {
      const res = await database.getDocument(DATABASE_ID, COLLECTION_ID, docId);
      setDoc(res);
    } catch (err) {
      console.error("Error fetching document:", err);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, []);

  if (!doc) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>

      <Text style={styles.header}>{doc.citizenName || "Citizen"}</Text>

      <View style={styles.section}>
        <Text style={styles.label}>NIC application</Text>
        <View style={styles.inputRow}>
          <Text style={styles.dropdownText}>Filled Form</Text>
          <Text>📩</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Original Birth Certificate</Text>
        <View style={styles.selectedBox}>
          <Text style={styles.selectedText}>{doc.businessName}</Text>
          <Text style={styles.subText}>xxxx xxxx xxxx 1234</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Photo studio slip</Text>
        <TouchableOpacity style={styles.imageBox}>
          {doc.photoUrl ? (
            <Image
              source={{ uri: doc.photoUrl }}
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
            />
          ) : (
            <Text>🖼️</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.approveButton}>
        <Text style={styles.approveText}>Approve and Fill the form</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.rejectText}>Reject</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  cancelText: { color: "#0000EE", marginBottom: 10 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  section: { marginBottom: 20 },
  label: { fontWeight: "600", marginBottom: 6 },
  inputRow: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdownText: { fontSize: 16 },
  selectedBox: {
    backgroundColor: "#f0f4ff",
    padding: 12,
    borderRadius: 8,
  },
  selectedText: { fontWeight: "500", fontSize: 16 },
  subText: { color: "#888" },
  imageBox: {
    backgroundColor: "#cce0ff",
    height: 150,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  approveButton: {
    backgroundColor: "#001F54",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  approveText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  rejectText: {
    color: "orange",
    textAlign: "center",
    marginTop: 12,
    fontWeight: "500",
  },
});
