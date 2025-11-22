import { Client, Account, Databases, Storage, ID } from "appwrite"; // <-- added ID

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // e.g. http://localhost/v1
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT); // projectID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// ✔ Export ID for generating unique IDs
export { ID };

// env helpers
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const USERS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
export const ORDERS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID;
export const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
