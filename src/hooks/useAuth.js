import { useState, useEffect, useCallback } from 'react';
import { account } from '../appwrite';
import { USER_ROLES } from '../config';

/**
 * useAuth Hook
 * Custom hook for handling authentication state and operations
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check current user on mount
  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      setLoading(true);
      const userData = await account.get();
      setUser(userData);
    } catch (err) {
      console.log('No user logged in');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      await account.createEmailSession(email, password);
      const userData = await account.get();
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (email, password, name) => {
    try {
      setLoading(true);
      setError(null);
      await account.create('unique()', email, password, name);
      await account.createEmailSession(email, password);
      const userData = await account.get();
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await account.deleteSession('current');
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const isAdmin = useCallback(() => {
    if (!user) return false;
    // Check if user has admin role (depends on your Appwrite setup)
    return user.labels?.includes('admin') || user.email === 'admin@example.com';
  }, [user]);

  const isClient = useCallback(() => {
    if (!user) return false;
    return user.labels?.includes('client') || user.role === USER_ROLES.CLIENT;
  }, [user]);

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    isAdmin,
    isClient,
    checkUserStatus,
  };
}

export default useAuth;
