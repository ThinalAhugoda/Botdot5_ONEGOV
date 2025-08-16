import { useAuth } from "@/lib/auth-context";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text, TextInput } from "react-native-paper";
;

export default function SignUpScreen() {
    const [nic, setNic] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>("");
    const [loading, setLoading] = useState(false);
    const [rateLimitMessage, setRateLimitMessage] = useState("");

    const { signUp } = useAuth();

    const [lastAttempt, setLastAttempt] = useState(0);
    const RATE_LIMIT_DELAY = 2000;

    // NIC validation function
    const validateNIC = (nic: string): boolean => {
        // Remove spaces and convert to uppercase
        const cleanNIC = nic.trim().toUpperCase();
        
        // Check for old NIC format (9 digits + V/X)
        const oldNICRegex = /^\d{9}[V|X]$/;
        
        // Check for new NIC format (12 digits)
        const newNICRegex = /^\d{12}$/;
        
        return oldNICRegex.test(cleanNIC) || newNICRegex.test(cleanNIC);
    };

    const handleSignUp = async () => {
        const now = Date.now();
        if (now - lastAttempt < RATE_LIMIT_DELAY) {
            setRateLimitMessage(`Please wait ${Math.ceil((RATE_LIMIT_DELAY - (now - lastAttempt)) / 1000)} seconds before trying again.`);
            return;
        }

        if (!nic || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (!validateNIC(nic)) {
            setError("Please enter a valid NIC number.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError(null);
        setRateLimitMessage("");
        setLoading(true);
        setLastAttempt(now);

        try {
            // Use NIC as email with domain suffix for Appwrite
            const email = `${nic}@onegov.local`;
            const result = await signUp(email, password);

            if (result === null) {
                router.replace("/(tabs)/Dashboard");
            } else {
                setError(result || "Sign up failed");
                if (result.includes("rate limit") || result.includes("too many requests")) {
                    setRateLimitMessage("Too many attempts. Please wait a moment before trying again.");
                }
            }
        } catch (error) {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "padding" : "height"}
            style={styles.container}
        ><ScrollView>
            {/* Blue Top Section */}
            <View style={styles.topSection}>
                <Spacer size={90} />
                <Image
                    source={require("@/assets/admin.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Spacer size={50} />
            </View>

            {/* White Form Section */}
            <View style={styles.formSection}>
                <Spacer size={25} />

                <Text style={styles.signUpTitle}>Create Account</Text>

                <TextInput
                    mode="outlined"
                    placeholder="NIC Number"
                    style={styles.input}
                    value={nic}
                    onChangeText={setNic}
                    outlineColor="#ddd"
                    activeOutlineColor="#ddd"
                    autoCapitalize="characters"
                />

                <TextInput
                    mode="outlined"
                    placeholder="Password"
                    secureTextEntry
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    outlineColor="#ddd"
                    activeOutlineColor="#ddd"
                />

                <TextInput
                    mode="outlined"
                    placeholder="Confirm Password"
                    secureTextEntry
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    outlineColor="#ddd"
                    activeOutlineColor="#ddd"
                />

                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                {rateLimitMessage ? <Text style={styles.errorText}>{rateLimitMessage}</Text> : null}

                <Button
                    mode="contained"
                    style={styles.signUpButton}
                    contentStyle={{ height: 50 }}
                    labelStyle={{ fontSize: 16, fontWeight: "bold" }}
                    onPress={handleSignUp}
                    loading={loading}
                    disabled={loading}
                >
                    Sign Up
                </Button>

                <Text style={styles.termsText}>
                    By creating an account you agree to our{" "}
                    <Text style={styles.termsLink}>Terms and Conditions</Text>
                </Text>

                <Button
                    mode="text"
                    onPress={() => router.replace("/auth")}
                    labelStyle={{ color: "#333A4A", fontSize: 14 }}
                >
                    Already have an account? Login
                </Button>
            </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const Spacer = ({ size = 20 }) => <View style={{ height: size }} />;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    topSection: {
        backgroundColor: "#333A4A",
        paddingVertical: 50,
        alignItems: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    logo: {
        width: 360,
        height: 70,
    },
    formSection: {
        flex: 1,
        padding: 20,
        alignItems: "center",
    },
    signUpTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFC107",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    signUpButton: {
        backgroundColor: "#333A4A",
        width: "100%",
        marginTop: 10,
        borderRadius: 6,
    },
    termsText: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
        marginTop: 15,
    },
    termsLink: {
        color: "#001B54",
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
    errorText: {
        color: "red",
        marginBottom: 10,
        textAlign: "center",
    },
});
