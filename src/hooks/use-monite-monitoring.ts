import { useState, useEffect } from 'react';

export function useMoniteMonitoring() {
  const [status, setStatus] = useState('active');

  useEffect(() => {
    // Simple monitoring status
    setStatus('active');
  }, []);

  return { status };
}