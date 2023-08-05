import { useEffect } from 'react';

export function useDataRefresh(callback) {
  const RefreshInterval = 60000; // Refresh interval in milliseconds (10 seconds)

  useEffect(() => {
    const interval = setInterval(() => {
      callback();
    }, RefreshInterval);

    return () => clearInterval(interval);
  }, [callback]);
}
