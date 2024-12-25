import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type MoniteOperation = 'API_CALL' | 'TOKEN_REFRESH' | 'ENTITY_UPDATE' | 'WEBHOOK_RECEIVED';
type OperationStatus = 'SUCCESS' | 'ERROR' | 'WARNING';

interface MoniteLogEntry {
  event_type: MoniteOperation;
  status: OperationStatus;
  details?: Record<string, any>;
}

export class MoniteMonitoringService {
  private static async logOperation({ event_type, status, details = {} }: MoniteLogEntry) {
    try {
      console.log(`Monite Operation: ${event_type} - Status: ${status}`);
      
      const { error } = await supabase
        .from('monite_audit_logs')
        .insert({
          event_type,
          status,
          details,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        });

      if (error) {
        console.error('Error logging operation:', error);
        throw error;
      }
    } catch (error) {
      console.error('Failed to log operation:', error);
      // Don't throw here to prevent monitoring issues from affecting core functionality
    }
  }

  static async logApiCall(endpoint: string, success: boolean, details?: Record<string, any>) {
    await this.logOperation({
      event_type: 'API_CALL',
      status: success ? 'SUCCESS' : 'ERROR',
      details: {
        endpoint,
        ...details
      }
    });

    if (!success) {
      toast({
        title: "API Error",
        description: "There was an error communicating with Monite. Please try again.",
        variant: "destructive",
      });
    }
  }

  static async logTokenRefresh(success: boolean, details?: Record<string, any>) {
    await this.logOperation({
      event_type: 'TOKEN_REFRESH',
      status: success ? 'SUCCESS' : 'ERROR',
      details
    });
  }

  static async logEntityUpdate(success: boolean, details?: Record<string, any>) {
    await this.logOperation({
      event_type: 'ENTITY_UPDATE',
      status: success ? 'SUCCESS' : 'ERROR',
      details
    });
  }

  static async logWebhook(success: boolean, details?: Record<string, any>) {
    await this.logOperation({
      event_type: 'WEBHOOK_RECEIVED',
      status: success ? 'SUCCESS' : 'ERROR',
      details
    });
  }

  static async getRecentLogs() {
    const { data, error } = await supabase
      .from('monite_audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching logs:', error);
      throw error;
    }

    return data;
  }
}