import { Client, Account, Databases, Storage, ID, InputFile } from 'appwrite';

const client = new Client();

const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || process.env.APP_WRITE_Project_ID || '689da5b30029c853a500';

client
  .setEndpoint(endpoint)
  .setProject(projectId);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage, ID, InputFile };
