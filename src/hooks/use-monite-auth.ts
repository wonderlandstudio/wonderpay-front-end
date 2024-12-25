import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { MoniteMonitoringService } from '@/services/monitoring/moniteMonitoring';

interface MoniteAuthState {
  isAuthenticated: boolean;
  entityId: string | null;
  environment: string;
}

export function useMoniteAuth() {
  const { data: authState, isLoading, error } = useQuery({
    queryKey: ['monite-auth'],
    queryFn: async (): Promise<MoniteAuthState> => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error('No authenticated user');
        }

        // Get Monite settings
        const { data: settings } = await supabase
          .from('monite_settings')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (!settings) {
          return {
            isAuthenticated: false,
            entityId: null,
            environment: 'sandbox'
          };
        }

        // Log successful auth check
        await MoniteMonitoringService.logApiCall('auth.check', true);

        return {
          isAuthenticated: true,
          entityId: settings.entity_id,
          environment: settings.environment
        };
      } catch (error) {
        console.error('Monite auth check failed:', error);
        await MoniteMonitoringService.logApiCall('auth.check', false, { error });
        toast({
          title: "Authentication Error",
          description: "Failed to verify Monite authentication status.",
          variant: "destructive",
        });
        throw error;
      }
    }
  });

  return {
    isAuthenticated: authState?.isAuthenticated ?? false,
    entityId: authState?.entityId,
    environment: authState?.environment ?? 'sandbox',
    isLoading,
    error
  };
}