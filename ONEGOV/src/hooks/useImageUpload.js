import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import ImageUploadService from '../services/imageUploadService';

/** Simplified helpers: no mime detection needed */

export const useImageUpload = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const buildFileObject = (uri, originalName) => {
        const safeName = originalName || uri.split('/').pop() || `file_${Date.now()}`;
        return { uri, name: safeName };
    };

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                setError('Permission to access media library denied');
                return null;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All, // allow all types
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled) {
                const asset = result.assets[0];
                const fileObj = buildFileObject(
                    asset.uri,
                    asset.fileName
                );
                setImage(fileObj);
                return fileObj;
            }
            return undefined;
        } catch (err) {
            setError('Error picking file: ' + err.message);
            return null;
        }
    };

    const takePhoto = async () => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                setError('Permission to access camera denied');
                return null;
            }

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled) {
                const asset = result.assets[0];
                const fileObj = buildFileObject(
                    asset.uri,
                    asset.fileName || `photo_${Date.now()}.jpg`
                );
                setImage(fileObj);
                return fileObj;
            }
            return undefined;
        } catch (err) {
            setError('Error taking photo: ' + err.message);
            return null;
        }
    };

    const uploadImage = async (fileObj, userId) => {
        setUploading(true);
        setError(null);
    
        try {
            // Service no longer needs userId; keep signature for compatibility
            const fileId = await ImageUploadService.uploadImage(fileObj);
            return fileId;
        } catch (err) {
            setError('Error uploading image: ' + (err?.message || String(err)));
            throw err;
        } finally {
            setUploading(false);
        }
    };

    const reset = () => {
        setImage(null);
        setUploading(false);
        setError(null);
    };

    return {
        image,
        uploading,
        error,
        pickImage,
        takePhoto,
        uploadImage,
        reset,
    };
};
