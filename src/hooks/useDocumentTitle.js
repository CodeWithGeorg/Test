import { useEffect } from 'react';

/**
 * useDocumentTitle Hook
 * Custom hook for updating the document title
 */
export function useDocumentTitle(title, restoreOnUnmount = true) {
  const defaultTitle = 'Academic MVP';

  useEffect(() => {
    // Set the new title
    document.title = title ? `${title} | ${defaultTitle}` : defaultTitle;

    // Restore the default title when component unmounts
    return () => {
      if (restoreOnUnmount) {
        document.title = defaultTitle;
      }
    };
  }, [title, restoreOnUnmount, defaultTitle]);
}

export default useDocumentTitle;
