import { Account, Client, Databases } from 'react-native-appwrite';

// Single client instance with proper configuration
const client = new Client() 
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('689da5b30029c853a500')
    .setPlatform('com.onegov.core');

// Export the same client instance everywhere
export const account = new Account(client);

export const database = new Databases(client); // Add this line for database functionality

export const debugClient = () => {
    console.log('Appwrite Client Config:', {
        endpoint: 'https://fra.cloud.appwrite.io/v1',
        projectId: '689da5b30029c853a500',
        platform: 'com.onegov.core'
    });
};
