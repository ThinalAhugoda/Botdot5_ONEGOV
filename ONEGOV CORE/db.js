import { Client, Databases } from "appwrite";
import fs from "fs";

const client = new Client()
    .setEndpoint("https://YOUR_APPWRITE_ENDPOINT/v1") // Your Appwrite endpoint
    .setProject("") // Your Appwrite project ID
    .setKey("YOUR_API_KEY"); // API key with database read permissions

const databases = new Databases(client);

// Replace with your Database ID
const DATABASE_ID = "689dcd030009014fa515";

async function exportCollections() {
    try {
        // List all collections
        const collections = await databases.listCollections(DATABASE_ID);

        for (const collection of collections.collections) {
            console.log(`Exporting ${collection.name}...`);

            // Fetch all documents in this collection
            let documents = [];
            let offset = 0;
            const limit = 100; // Appwrite max per request

            while (true) {
                const res = await databases.listDocuments(
                    DATABASE_ID,
                    collection.$id,
                    [ `limit(${limit})`, `offset(${offset})` ]
                );
                documents = documents.concat(res.documents);

                if (res.documents.length < limit) break;
                offset += limit;
            }

            // Save schema
            fs.writeFileSync(
                `dump_${collection.$id}_schema.json`,
                JSON.stringify(collection, null, 2)
            );

            // Save documents
            fs.writeFileSync(
                `dump_${collection.$id}_data.json`,
                JSON.stringify(documents, null, 2)
            );
        }

        console.log("✅ Export complete! JSON files saved.");
    } catch (err) {
        console.error("❌ Error exporting:", err);
    }
}

exportCollections();
