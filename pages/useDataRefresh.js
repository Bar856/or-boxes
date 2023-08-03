import { useEffect } from 'react';

const RefreshInterval = 5000; // Refresh interval in milliseconds (10 seconds)

export function useDataRefresh(callback) {
  useEffect(() => {
    const interval = setInterval(callback, RefreshInterval);

    return () => clearInterval(interval);
  }, [callback]);
}