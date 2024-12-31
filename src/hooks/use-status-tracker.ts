import { useState, useEffect } from 'react';

export function useStatusTracker() {
  const [status, setStatus] = useState('active');

  useEffect(() => {
    // Simple status tracking
    setStatus('active');
  }, []);

  return { status };
}