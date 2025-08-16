import { database } from "@/lib/appwrite"; // Adjust path if needed
import { useNavigation } from "@react-navigation/native";
import { router } from 'expo-router';
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Query, RealtimeResponseEvent } from "react-native-appwrite";
import { Text } from "react-native-paper";

const DATABASE_ID = "689dcd030009014fa515";
const COLLECTION_ID = "689ec99600142d76d0b1";

export default function CitizenRequestsScreen() {
  const [citizens, setCitizens] = useState<any[]>([]);

  // Fetch initial data
  const fetchCitizens = async () => {
    try {
      const response = await database.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.orderDesc("$createdAt")]
      );
      setCitizens(response.documents);
    } catch (error) {
      console.error("Error fetching citizens:", error);
    }
  };

  // Listen for real-time updates
  const subscribeRealtime = () => {
    const unsubscribe = database.client.subscribe(
      [`databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`],
      (event: RealtimeResponseEvent<any>) => {
        if (event.events.includes("databases.*.collections.*.documents.*.create")) {
          // Add new document to top
          setCitizens(prev => [event.payload, ...prev]);
        }
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    fetchCitizens();
    const unsub = subscribeRealtime();
    return () => {
      unsub();
    };
  }, []);

  // inside your component:
const navigation = useNavigation();

const renderItem = ({ item }: { item: any }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => router.push({ pathname: '/info_approve', params: { docId: item.$id } })}
  >
    <Text style={styles.text}>{item.businessName}</Text>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      <FlatList
        data={citizens}
        keyExtractor={(item) => item.$id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#fff",
  },
  item: {
    backgroundColor: "#f0f4ff",
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});
