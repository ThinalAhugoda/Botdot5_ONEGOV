import { database } from "@/lib/appwrite";
import { useLocalSearchParams, useRouter } from "expo-router";
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
const COLLECTION_ID = "689eff02003552b94970";

export default function DSInfoApproveScreen() {
  const router = useRouter();
  const { docId } = useLocalSearchParams<{ docId: string }>();

  const [doc, setDoc] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocument = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await database.getDocument(DATABASE_ID, COLLECTION_ID, docId);
      setDoc(res);
    } catch (err) {
      console.error("Error fetching document:", err);
      setError("Failed to load citizen information");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, []);

  if (loading) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.loadingText}>Loading citizen information...</Text>
      </ScrollView>
    );
  }

  if (error || !doc) {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>{error || "No document found"}</Text>
        <TouchableOpacity onPress={fetchDocument}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>

      <Text style={styles.header}>{doc?.NameSin || "Citizen"}</Text>

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
          <Text style={styles.selectedText}>{doc?.businessName || "N/A"}</Text>
          <Text style={styles.subText}>xxxx xxxx xxxx 1234</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Photo studio slip</Text>
        <TouchableOpacity style={styles.imageBox}>
          {doc?.photoUrl ? (
            <Image
              source={{ uri: doc.photoUrl }}
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
            />
          ) : (
            <Text>🖼️</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.approveButton}
        onPress={async () => {
          await database.createDocument(DATABASE_ID, COLLECTION_ID, "unique()", {
            OfficerName: doc?.OfficerName,
            Confirmation: true,
            ApprovalStatus: true,
            citizenId: docId, // Save the docId as citizenId
          });
          router.push(`/DS/DS_Form?docId=${docId}`);
        }}
      >
        <Text style={styles.approveText}>Approve as Divisional Secretary</Text>
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
  loadingText: { fontSize: 16, textAlign: "center", marginTop: 20 },
  errorText: { fontSize: 16, color: "red", textAlign: "center", marginTop: 20 },
  retryText: { color: "#0000EE", textAlign: "center", marginTop: 10 },
});

