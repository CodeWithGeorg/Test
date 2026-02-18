import { useState, useEffect, useCallback } from 'react';
import { databases, ID } from '../appwrite';
import { DATABASE_ID, ORDERS_COLLECTION_ID } from '../appwrite';
import { ORDER_STATUS } from '../config';

/**
 * useOrders Hook
 * Custom hook for handling order operations
 */
export function useOrders(userId) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders when userId changes
  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await databases.listDocuments(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        [
          `userId=${userId}`,
          'orderBy=createdAt:desc'
        ]
      );
      
      setOrders(response.documents);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = useCallback(async (orderData) => {
    try {
      setLoading(true);
      setError(null);
      
      const newOrder = await databases.createDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        ID.unique(),
        {
          ...orderData,
          userId,
          status: ORDER_STATUS.PENDING,
          createdAt: new Date().toISOString(),
        }
      );
      
      setOrders((prev) => [newOrder, ...prev]);
      return newOrder;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateOrderStatus = useCallback(async (orderId, status) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedOrder = await databases.updateDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        orderId,
        {
          status,
          updatedAt: new Date().toISOString(),
        }
      );
      
      setOrders((prev) =>
        prev.map((order) =>
          order.$id === orderId ? updatedOrder : order
        )
      );
      
      return updatedOrder;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelOrder = useCallback(async (orderId) => {
    return updateOrderStatus(orderId, ORDER_STATUS.CANCELLED);
  }, [updateOrderStatus]);

  const getOrderById = useCallback(async (orderId) => {
    try {
      const order = await databases.getDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        orderId
      );
      return order;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    getOrderById,
  };
}

export default useOrders;
