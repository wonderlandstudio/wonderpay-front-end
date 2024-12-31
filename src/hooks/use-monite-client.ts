import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useMoniteClient() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    checkClientStatus();
  }, []);

  const checkClientStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsReady(true);
      }
    } catch (error) {
      console.error('Client check failed:', error);
      setIsReady(false);
    }
  };

  return { isReady };
}