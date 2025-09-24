// Add_birth_certi.tsx
import React,{ useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // Keep this import
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Client, Storage, ID } from "appwrite";
import { useImageUpload } from "../src/hooks/useImageUpload";
import { Client as nativeClient, Storage as nativeStorage, ID as nativeID } from 'react-native-appwrite';
import {useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("window");

export default function AddBirthCertificateScreen() {
  const navigation = useNavigation();

  const [outsideFileId, set_outisdeFileId] = useState({id: ''}) // variable which holds the signature ID
/* main function to send the image  */
const {pickImage} = useImageUpload(); 
const onPressHandler = async () => {
  console.log('Button pressed');
  const image = await pickImage();

  if (image) {
    console.log('Image successfully received:', image)
    
    sendImage(image.uri, image.name)
  }
}
/* send image to bucket */
async function sendImage(imageFile: any, imageFileName: any) {
  const fileId = nativeID.unique();
  set_outisdeFileId({id: fileId})

  const client2 = new nativeClient()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('');

  const storages2 = new nativeStorage(client2);

  try {
    console.log('Sending image to bucket...')

    const Promise = await storages2.createFile(
      '689e1cbf002bf73a9b8e', // Bucket ID 
      fileId, // New file ID
      {
        name: imageFileName,
        type: 'jpeg/png',
        size: 12345, 
        uri: imageFile, 
      }
    );
    console.log('Image has been sent successfully:', Promise);
  } catch (e) {
    console.error('Error sending image to bucket:', e);
  }

}
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Add new birth certificate</Text>
        </View>

        {/* Upload Box */}
        <View style={styles.uploadCard}>
          {/* First Row */}
          <Text style={styles.label}>PDF</Text>
          <TouchableOpacity style={styles.uploadArea}>
            <View style={styles.uploadContent}>
              <Ionicons name="document" size={32} color="#007bff" />
              <Text style={styles.uploadText}>Tap to upload PDF</Text>
              <Text style={styles.uploadSubtext}>or drag and drop here</Text>
            </View>
          </TouchableOpacity>

         {/* Second Row */}
         <Text style={styles.label}>Image</Text>
          <TouchableOpacity style={styles.uploadArea} onPress={onPressHandler}>
            <View style={styles.uploadContent}>
              <Ionicons name="camera" size={32} color="#007bff" />
              <Text style={styles.uploadText}>Tap to upload a Image</Text>
              <Text style={styles.uploadSubtext}>or drag and drop here</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={onPressHandler}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('BirthCert' as never)}>
          <Text style={styles.saveText}>Continue</Text>
        </TouchableOpacity>

        {/* Cancel */}
        <TouchableOpacity>
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
    alignItems: "center",
    paddingBottom: 30,
  },
  header: {
    width: "100%",
    backgroundColor: "#007bff",
    paddingVertical: 65,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
  },
  uploadCard: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#007bff",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    width: width * 0.85,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
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
    backgroundColor: "#007bff",
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
});
