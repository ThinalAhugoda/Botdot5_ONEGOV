import { useAuth } from "@/lib/auth-context";
import { Link, router } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Index() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/auth");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ONEGOVE CORE</Text>
      
      <TouchableOpacity 
        style={styles.signOutButton} 
        onPress={handleSignOut}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      <Link href="../auth" style={styles.navButton}>
        Login Page
      </Link>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  signOutButton: {
    backgroundColor: "#ff4444",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  signOutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  navButton: {
    width: 150,
    height: 50,
    backgroundColor: "#111111",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    padding: 15,
    borderRadius: 36,
    textAlign: "center",
  },
})
