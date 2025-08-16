import { database } from "@/lib/appwrite";
import { router } from 'expo-router';
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Query, RealtimeResponseEvent } from "react-native-appwrite";
import { Text } from "react-native-paper";

// Using the same database structure as citizen_requests.tsx
const DATABASE_ID = "689dcd030009014fa515";
const COLLECTION_ID = "689eff02003552b94970";

export default function RequestsScreen() {
  const [forms, setForms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  const fetchForms = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching from database:", DATABASE_ID);
      console.log("Fetching from collection:", COLLECTION_ID);
      
      const response = await database.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.orderDesc("$createdAt")]
      );
      
      console.log("Response received:", response);
      console.log("Documents found:", response.documents.length);
      
      if (response.documents.length > 0) {
        console.log("First document structure:", response.documents[0]);
        console.log("NameSin values:", response.documents.map(doc => doc.NameSin));
      }
      
      setForms(response.documents);
    } catch (error) {
      console.error("Error fetching forms:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch forms");
    } finally {
      setLoading(false);
    }
  };

  // Listen for real-time updates
  const subscribeRealtime = () => {
    try {
      const unsubscribe = database.client.subscribe(
        [`databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`],
        (event: RealtimeResponseEvent<any>) => {
          console.log("Realtime event received:", event);
          if (event.events.includes("databases.*.collections.*.documents.*.create")) {
            console.log("New document added:", event.payload);
            setForms(prev => [event.payload, ...prev]);
          }
        }
      );
      return unsubscribe;
    } catch (error) {
      console.error("Error setting up realtime subscription:", error);
      return () => {};
    }
  };

  useEffect(() => {
    fetchForms();
    const unsub = subscribeRealtime();
    return () => {
      unsub();
    };
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => router.push({ pathname: '/info_approve', params: { docId: item.$id } })}
    >
      <Text style={styles.text}>{item.NameSin || 'No Name Available'}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading NIC Forms...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchForms}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (forms.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.emptyText}>No NIC forms found</Text>
        <Text style={styles.emptySubtext}>Forms will appear here when submitted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={forms}
        keyExtractor={(item) => item.$id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: "#f0f4ff",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: '#333',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  retryButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
