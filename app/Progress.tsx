import { database } from "./lib/appwrite";
import { NavigationProp, ParamListBase, useNavigation, useFocusEffect, useRoute, RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "./Navigation";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Query } from "react-native-appwrite";

const ApprovalProgress = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [progress, setProgress] = useState(25); // Step 1 always filled
  const [loading, setLoading] = useState(true);

  // Get citizenId passed in via route params from NIC form submission
  const route = useRoute<RouteProp<RootStackParamList, 'Progress'>>();
  const citizenId = route.params?.citizenId;

  // Your Appwrite database + collection IDs
  const databaseId = "689dcd030009014fa515";
  const gnCollectionId = "689f37640037b9e9b444";
  const dsCollectionId = "689f8a390016d939ba23";

  const checkApprovals = React.useCallback(async () => {
    try {
      if (!citizenId) {
        return;
      }
      let currentProgress = 25;

      // --- Step 2: Check GN_Form collection ---
      const gnResult = await database.listDocuments(
        databaseId,
        gnCollectionId,
        [Query.equal("citizen_Id", citizenId)]
      );

      if (gnResult.documents.length > 0 && gnResult.documents[0].Approval_Status === true) {
        currentProgress = 50;
      }

      // --- Step 3: Check DS_Form collection ---
      const dsResult = await database.listDocuments(
        databaseId,
        dsCollectionId,
        [Query.equal("citizenId", citizenId)]
      );

      if (dsResult.documents.length > 0 && dsResult.documents[0].ApprovalStatus === true) {
        currentProgress = 100;
      }

      setProgress(currentProgress);
    } catch (error) {
      console.error("Error checking approvals:", error);
    }
  }, [databaseId, gnCollectionId, dsCollectionId, citizenId]);

  // Initial load
  useEffect(() => {
    let active = true;
    const init = async () => {
      setLoading(true);
      if (!citizenId) {
        if (active) setLoading(false);
        return;
      }
      await checkApprovals();
      if (active) setLoading(false);
    };
    init();
    return () => { active = false; };
  }, [checkApprovals, citizenId]);

  // Poll every 10 seconds while this screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const id = setInterval(() => {
        checkApprovals();
      }, 10000); // 10 seconds

      return () => clearInterval(id);
    }, [checkApprovals])
  );

  useEffect(() => {
    if (!loading && progress === 100) {
      navigation.navigate("QR" as never);
    }
  }, [loading, progress, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Wait for the approval from the {"\n"} GN and DS
      </Text>

      <View style={styles.logoBox}>
        <Text style={styles.logoText}>
          ONE<Text style={{ color: "#FFC107" }}>G</Text>OV
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <View style={styles.stepLabels}>
        <Text style={styles.stepText}>Grama Niladhari</Text>
        <Text style={styles.stepText}>DS Office</Text>
        <Text style={styles.stepText}>Payment</Text>
        <Text style={styles.stepText}>Data Entry</Text>
      </View>

      <Text style={styles.infoTitle}>
        Grama Niladhari and Divisional Secretariat will consider and approve
      </Text>
      <Text style={styles.infoText}>
        Please make sure to attach all the necessary documents otherwise you will
        not be able to proceed to next steps. Your NIC is being checked by the GN
        and it will go through GN to the Register Department.
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#003DA5" style={{ marginTop: 20 }} />
      ) : (
        <>
          <TouchableOpacity
            style={[styles.continueButton, progress < 100 && { opacity: 0.5 }]}
            disabled={progress < 100}
            onPress={() => navigation.navigate("QR" as never)}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#1976D2",
    textAlign: "center",
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: "100%",
    marginBottom: 30,
  },
  logoBox: {
    backgroundColor: "#1976D2",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 2,
  },
  progressBar: {
    height: 12,
    width: "100%",
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#1976D2",
  },
  stepLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  stepText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center",
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginVertical: 10,
  },
  continueButton: {
    backgroundColor: "#1976D2",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 15,
  },
  cancelText: {
    color: "#F44336",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ApprovalProgress;
