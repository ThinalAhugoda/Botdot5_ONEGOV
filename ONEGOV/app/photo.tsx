import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useImageUpload } from '../src/hooks/useImageUpload';
import {useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("window");

export default function PhotoStepScreen() {
  const navigation = useNavigation();
  const {
    image,
    uploading,
    error,
    pickImage,
    takePhoto,
    uploadImage,
    reset,
  } = useImageUpload();

  const [pdfFile, setPdfFile] = useState<any>(null);
  const [imageFile, setImageFile] = useState<any>(null);
  const [userId] = useState('user_123'); // Replace with actual user ID from auth

  const handleImageUpload = async () => {
    if (!imageFile) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    try {
      const fileId = await uploadImage(imageFile, userId);
      Alert.alert('Success', 'Image uploaded successfully!');
      
      // Store file ID for later use
      console.log('Uploaded file ID:', fileId);
      // Navigate to next screen
    } catch (err) {
      console.error('Upload error:', err);
      Alert.alert('Upload Error', (err as Error).message || 'Failed to upload image');
      
    }
  };

  const handleSelectImage = async () => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        { text: 'Camera', onPress: async () => {
          const selectedImage = await takePhoto();
          if (selectedImage) setImageFile(selectedImage);
        }},
        { text: 'Gallery', onPress: async () => {
          const selectedImage = await pickImage();
          if (selectedImage) setImageFile(selectedImage);
        }},
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleSelectPDF = async () => {
    Alert.alert('PDF Upload', 'PDF upload functionality will be implemented soon');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Top Navigation Bar */}
        <View style={styles.navBar}>
          <TouchableOpacity>
            <Text style={styles.cancelNav}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.navTitle}>Application for NIC</Text>
          <View style={{ width: 50 }} /> {/* Spacer */}
        </View>

        {/* Progress Step Bar */}
        <View style={styles.stepBar}>
          {["NIC Form", "Birth certificate", "Photo", "Request"].map((label, index) => (
            <View key={index} style={styles.stepItem}>
              <View
                style={[
                  styles.stepCircle,
                  index < 3
                    ? { backgroundColor: "#166EFF" }
                    : { backgroundColor: "#FBBC05" },
                ]}
              >
                {index < 3 ? (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                ) : (
                  <Text style={styles.stepNumber}>4</Text>
                )}
              </View>
              <Text style={styles.stepLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Title */}
        <Text style={styles.title}>Attach Your studio Photo Slip</Text>
        <Text style={styles.subtitle}>
          Please make sure to attach your original Photo studio slip make sure
          that the respective studio has sent the photo to the Department
        </Text>

        {/* Upload Box */}
        <View style={styles.uploadCard}>
          {/* First Row - PDF */}
          <Text style={styles.label}>PDF</Text>
          <TouchableOpacity style={styles.uploadArea} onPress={handleSelectPDF}>
            <View style={styles.uploadContent}>
              <Ionicons name="document" size={32} color="#007bff" />
              <Text style={styles.uploadText}>
                {pdfFile ? 'PDF Selected' : 'Tap to upload PDF'}
              </Text>
              <Text style={styles.uploadSubtext}>or drag and drop here</Text>
            </View>
          </TouchableOpacity>

          {/* Second Row - Image */}
          <Text style={styles.label}>Image</Text>
          <TouchableOpacity style={styles.uploadArea} onPress={handleSelectImage}>
            {imageFile ? (
              <View style={styles.imagePreview}>
                <Image source={{ uri: imageFile.uri }} style={styles.selectedImage} />
                <Text style={styles.imageName}>{imageFile.name}</Text>
              </View>
            ) : (
              <View style={styles.uploadContent}>
                <Ionicons name="camera" size={32} color="#007bff" />
                <Text style={styles.uploadText}>Tap to upload a Image</Text>
                <Text style={styles.uploadSubtext}>or drag and drop here</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Error Message */}
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        {/* Save Button */}
        <TouchableOpacity 
          style={[styles.saveButton, uploading && styles.disabledButton]} 
          onPress={handleImageUpload}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.saveText}>Save</Text>
          )}
        </TouchableOpacity>

        {/* continue Button */}
        <TouchableOpacity 
        style={[styles.saveButton, uploading && styles.disabledButton]} onPress={() => navigation.navigate('Request' as never)}>
          <Text style={styles.cancelText}>Continue</Text>
        </TouchableOpacity>

        {/* Cancel */}
        <TouchableOpacity onPress={reset}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    paddingBottom: 30,
    alignItems: "center",
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#fff",
    elevation: 3,
  },
  cancelNav: {
    color: "#166EFF",
    fontSize: 15,
    fontWeight: "500",
  },
  navTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  stepBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    paddingVertical: 16,
  },
  stepItem: {
    alignItems: "center",
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  stepNumber: {
    color: "#fff",
    fontWeight: "700",
  },
  stepLabel: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginTop: 6,
    paddingHorizontal: 20,
  },
  uploadCard: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#166EFF",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    width: width * 0.85,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  imageBox: {
    height: width * 0.45,
    backgroundColor: "#a5c9ff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#166EFF",
    width: width * 0.85,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelText: {
    color: "#f1a100",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 12,
  },
    uploadArea: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#007bff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    backgroundColor: "#f8f9fa",
  },
  uploadContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    fontSize: 16,
    color: "#007bff",
    fontWeight: "600",
    marginTop: 8,
  },
  uploadSubtext: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  imagePreview: {
    alignItems: "center",
    justifyContent: "center",
  },
  selectedImage: {
    width: width * 0.6,
    height: width * 0.4,
    borderRadius: 8,
    marginBottom: 8,
  },
  imageName: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },
  errorText: {
    color: "#ff0000",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
});

