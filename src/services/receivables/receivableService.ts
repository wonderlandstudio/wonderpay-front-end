import type { MoniteSDK, CreatePaymentLinkRequest } from '@monite/sdk-api';
import { MoniteAPIService } from '../api/MoniteAPIService';
import { MoniteMonitoringService } from '../monitoring/moniteMonitoring';
import type { MoniteReceivable } from '@/types/payments';

export class ReceivableService {
  static async getReceivables() {
    console.log('Fetching receivables from Monite');
    const api = await MoniteAPIService.getInstance();
    const sdk = api.getSDK() as MoniteSDK;
    
    try {
      const response = await sdk.api.receivable.getAll();
      await MoniteMonitoringService.logApiCall('receivables.getAll', true);
      return response.data as unknown as MoniteReceivable[];
    } catch (error) {
      await MoniteMonitoringService.logApiCall('receivables.getAll', false, { error });
      throw error;
    }
  }

  static async createInvoice(data: CreatePaymentLinkRequest) {
    console.log('Creating invoice with data:', data);
    const api = await MoniteAPIService.getInstance();
    const sdk = api.getSDK() as MoniteSDK;
    
    try {
      const response = await sdk.api.receivable.createNewReceivable(data);
      await MoniteMonitoringService.logApiCall('receivables.create', true);
      return response;
    } catch (error) {
      await MoniteMonitoringService.logApiCall('receivables.create', false, { error });
      throw error;
    }
  }
}