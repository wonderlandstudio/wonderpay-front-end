import { MoniteAuthService } from '../auth/moniteAuth';
import type { CreatePaymentLinkRequest, MoniteSDK } from '@monite/sdk-api';
import { MoniteMonitoringService } from '../monitoring/moniteMonitoring';
import { MoniteAPIService } from '../api/MoniteAPIService';

export class ReceivableService {
  static async getReceivables() {
    console.log('Fetching receivables from Monite');
    const api = await MoniteAPIService.getInstance();
    const sdk = api.getSDK() as MoniteSDK;
    
    try {
      const response = await sdk.api.receivable.getAll();
      await MoniteMonitoringService.logApiCall('receivables.getAll', true);
      return response.data || [];
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
      const response = await sdk.api.receivable.create(data);
      await MoniteMonitoringService.logApiCall('receivables.create', true);
      return response;
    } catch (error) {
      await MoniteMonitoringService.logApiCall('receivables.create', false, { error });
      throw error;
    }
  }
}