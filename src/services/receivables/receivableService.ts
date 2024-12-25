import { MoniteAuthService } from '../auth/moniteAuth';
import type { CreatePaymentLinkRequest } from '@monite/sdk-api';
import { MoniteMonitoringService } from '../monitoring/moniteMonitoring';
import { MoniteSDK } from '@monite/sdk-api';

export class ReceivableService {
  static async getReceivables() {
    console.log('Fetching receivables from Monite');
    const sdk = await MoniteAuthService.initializeSDK() as MoniteSDK;
    const response = await sdk.api.receivables.getAll();
    await MoniteMonitoringService.logApiCall('receivables.getAll', true);
    return response.data || [];
  }

  static async createInvoice(data: CreatePaymentLinkRequest) {
    console.log('Creating invoice with data:', data);
    const sdk = await MoniteAuthService.initializeSDK() as MoniteSDK;
    try {
      const response = await sdk.api.receivables.create(data);
      await MoniteMonitoringService.logApiCall('receivables.create', true);
      return response;
    } catch (error) {
      await MoniteMonitoringService.logApiCall('receivables.create', false, { error });
      throw error;
    }
  }
}