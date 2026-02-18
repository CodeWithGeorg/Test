import { useState, useCallback } from 'react';

/**
 * useLoading Hook
 * Custom hook for managing loading states
 */
export function useLoading(initialState = false) {
  const [loading, setLoading] = useState(initialState);
  const [error, setError] = useState(null);

  const startLoading = useCallback(() => {
    setLoading(true);
    setError(null);
  }, []);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const setErrorState = useCallback((errorMessage) => {
    setError(errorMessage);
    setLoading(false);
  }, []);

  const reset = useCallback(() => {
    setLoading(initialState);
    setError(null);
  }, [initialState]);

  // Execute async function with loading state
  const execute = useCallback(async (asyncFunction) => {
    try {
      startLoading();
      const result = await asyncFunction();
      stopLoading();
      return result;
    } catch (err) {
      setErrorState(err.message || 'An error occurred');
      throw err;
    }
  }, [startLoading, stopLoading, setErrorState]);

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setErrorState,
    reset,
    execute,
  };
}

export default useLoading;
