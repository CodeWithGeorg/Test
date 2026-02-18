/**
 * Application configuration
 * This file contains all the configuration constants for the application
 */

// Appwrite configuration
export const APPWRITE_CONFIG = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || '',
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || '',
  ordersCollectionId: import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID || '',
  usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID || '',
  bucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID || '',
};

// Application constants
export const APP_CONFIG = {
  appName: 'Academic MVP',
  appVersion: '1.0.0',
  defaultPageSize: 10,
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
};

// Order status constants
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.PROCESSING]: 'Processing',
  [ORDER_STATUS.SHIPPED]: 'Shipped',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
};

// User roles
export const USER_ROLES = {
  CLIENT: 'client',
  ADMIN: 'admin',
};
