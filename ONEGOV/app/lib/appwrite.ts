import { Account, Client, Databases } from 'react-native-appwrite';

// Single client instance with proper configuration
const client = new Client() 
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('')
    .setPlatform('com.onegov.core');

// Export the same client instance everywhere
export const account = new Account(client);

export const database = new Databases(client); // Add this line for database functionality

export const debugClient = () => {
    console.log('Appwrite Client Config:', {
        endpoint: 'https://fra.cloud.appwrite.io/v1',
        projectId: '',
        platform: 'com.onegov.core'
    });
};
