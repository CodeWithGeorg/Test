/**
 * Route constants for the application
 * Centralizes all route paths for easy maintenance
 */

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PLACE_ORDER: '/place-order',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
  PROFILE: '/profile',
  ORDER_HISTORY: '/orders',
  ORDER_DETAILS: '/orders/:id',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_USERS: '/admin/users',
};

// Helper function to generate order details URL
export const getOrderDetailsUrl = (orderId) => `/orders/${orderId}`;

// Helper function to generate admin order URL
export const getAdminOrderUrl = (orderId) => `/admin/orders/${orderId}`;
