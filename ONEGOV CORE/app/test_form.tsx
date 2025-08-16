import { database } from "@/lib/appwrite";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function TextForm() {
    const [businessName, setBusinessName] = useState("");
    const [placeOfBusiness, setPlaceOfBusiness] = useState("");
    const [natureOfBusiness, setNatureOfBusiness] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!businessName || !placeOfBusiness || !natureOfBusiness) {
            setError("Please fill in all fields.");
            return;
        }

        if (natureOfBusiness.length > 500) {
            setError("Nature of business must be 500 characters or less.");
            return;
        }

        setLoading(true);
        setError(null);

       

        try {
            await database.createDocument(
                '689dcd030009014fa515', // database ID
                '689ec99600142d76d0b1', // collection ID
                'unique()', // document ID
                {
                    businessName: businessName.trim(),
                    placeOfBusiness: placeOfBusiness.trim(),
                    natureOfBusiness: natureOfBusiness.trim(),
                }
                // No permissions parameter needed - uses collection defaults
            );

            // Success
            Alert.alert("Success", "Business information saved successfully!");
            
            // Clear form
            setBusinessName("");
            setPlaceOfBusiness("");
            setNatureOfBusiness("");
            
        } catch (error: any) {
            console.error("Database Error:", error);
            setError(`Error: ${error.message || "Failed to save data"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Business Information Form</Text>
            
            <Text style={styles.label}>Business Name *</Text>
            <TextInput
                style={styles.input}
                value={businessName}
                onChangeText={setBusinessName}
                placeholder="Enter business name"
                placeholderTextColor="#999"
            />

            <Text style={styles.label}>Principal Place of Business *</Text>
            <TextInput
                style={styles.input}
                value={placeOfBusiness}
                onChangeText={setPlaceOfBusiness}
                placeholder="Enter business location"
                placeholderTextColor="#999"
            />

            <Text style={styles.label}>General Nature of Business * (Max 500 chars)</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={natureOfBusiness}
                onChangeText={setNatureOfBusiness}
                placeholder="Describe the nature of your business"
                placeholderTextColor="#999"
                multiline
                maxLength={500}
                numberOfLines={4}
            />
            <Text style={styles.charCount}>{natureOfBusiness.length}/500</Text>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <Button 
                title={loading ? "Saving..." : "Submit Business Information"} 
                onPress={handleSubmit} 
                disabled={loading}
                color="#001F68"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#001F68',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        marginBottom: 5,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    charCount: {
        fontSize: 12,
        color: '#666',
        textAlign: 'right',
        marginBottom: 15,
    },
    errorText: {
        color: 'red',
        marginBottom: 15,
        fontSize: 14,
    },
});
