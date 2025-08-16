import { database } from "@/lib/appwrite";
import { router } from 'expo-router';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Query, RealtimeResponseEvent } from "react-native-appwrite";
import { Text } from "react-native-paper";

// Database structure for NIC forms
const DATABASE_ID = "689dcd030009014fa515";
const NIC_COLLECTION_ID = "689eff02003552b94970";
const GN_FORM_DATABASE_ID = "689dcd030009014fa515";
const GN_FORM_COLLECTION_ID = "689f37640037b9e9b444";

export default function NormalRequestsScreen() {
  const [forms, setForms] = useState<any[]>([]);
  const [approvalStatuses, setApprovalStatuses] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch approval status for a specific document
  const fetchApprovalStatus = async (docId: string) => {
    try {
      const response = await database.listDocuments(
        GN_FORM_DATABASE_ID,
        GN_FORM_COLLECTION_ID,
        [Query.equal("citizen_Id", docId)]
      );
      
      if (response.documents.length > 0) {
        return response.documents[0].Approval_Status === true;
      }
      return false;
    } catch (error) {
      console.error(`Error fetching approval status for ${docId}:`, error);
      return false;
    }
  };

  // Fetch all approval statuses for the forms
  const fetchAllApprovalStatuses = async (formsList: any[]) => {
    const statuses: Record<string, boolean> = {};
    
    const promises = formsList.map(async (form) => {
      const status = await fetchApprovalStatus(form.$id);
      statuses[form.$id] = status;
    });
    
    await Promise.all(promises);
    setApprovalStatuses(statuses);
  };

  // Fetch initial data
  const fetchForms = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching NIC forms from database:", DATABASE_ID);
      console.log("Fetching from collection:", NIC_COLLECTION_ID);
      
      const response = await database.listDocuments(
        DATABASE_ID,
        NIC_COLLECTION_ID,
        [Query.orderDesc("$createdAt")]
      );
      
      console.log("NIC forms found:", response.documents.length);
      
      setForms(response.documents);
      
      // Fetch approval statuses for all forms
      await fetchAllApprovalStatuses(response.documents);
      
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
        [`databases.${DATABASE_ID}.collections.${NIC_COLLECTION_ID}.documents`],
        (event: RealtimeResponseEvent<any>) => {
          console.log("Realtime event received:", event);
          
          if (event.events.includes("databases.*.collections.*.documents.*.create")) {
            console.log("New NIC form added:", event.payload);
            setForms(prev => [event.payload, ...prev]);
            
            // Fetch approval status for the new form
            fetchApprovalStatus(event.payload.$id).then(status => {
              setApprovalStatuses(prev => ({ ...prev, [event.payload.$id]: status }));
            });
          }
          
          // Handle updates to GN_FORM collection
          if (event.events.includes("databases.*.collections.*.documents.*.update")) {
            // Check if this is an update to GN_FORM collection
            if (event.payload.$collectionId === GN_FORM_COLLECTION_ID) {
              // Refresh approval status for affected forms
              fetchForms();
            }
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

  const renderItem = ({ item }: { item: any }) => {
    const canApprove = approvalStatuses[item.$id] === true;
    
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          if (canApprove) {
            router.push({ pathname: '/DS/(tabs)/DS_Form', params: { docId: item.$id } });
          }
        }}
        disabled={!canApprove}
      >
        <Text style={styles.text}>{item.NameSin || 'No Name Available'}</Text>
        
        {canApprove && (
          <TouchableOpacity
            style={styles.approveButton}
            onPress={(e) => {
              e.stopPropagation();
              router.push({ pathname: '/DS/(tabs)/DS_Form', params: { docId: item.$id } });
            }}
          >
            <Text style={styles.approveButtonText}>Proceed to DS Approval</Text>
          </TouchableOpacity>
        )}
        
        {!canApprove && (
          <Text style={styles.pendingText}>Pending GN Form Approval</Text>
        )}
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading Normal Requests...</Text>
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
        <Text style={styles.emptyText}>No normal requests found</Text>
        <Text style={styles.emptySubtext}>Requests will appear here when submitted</Text>
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
    marginBottom: 8,
  },
  approveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  approveButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  pendingText: {
    fontSize: 12,
    color: '#dc3545',
    marginTop: 8,
    fontStyle: 'italic',
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
