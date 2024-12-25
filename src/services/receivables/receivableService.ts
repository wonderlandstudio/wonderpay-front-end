import { MoniteAuthService } from '../auth/moniteAuth';
import type { CreatePaymentLinkRequest } from '@monite/sdk-api';
import { MoniteMonitoringService } from '../monitoring/moniteMonitoring';

export class ReceivableService {
  static async getReceivables() {
    console.log('Fetching receivables from Monite');
    const sdk = await MoniteAuthService.initializeSDK();
    const response = await sdk.receivables.getAll();
    await MoniteMonitoringService.logApiCall('receivables.getAll', true);
    return response.data || [];
  }

  static async createInvoice(data: Omit<CreatePaymentLinkRequest, 'type'>) {
    console.log('Creating invoice with data:', data);
    const sdk = await MoniteAuthService.initializeSDK();
    try {
      const response = await sdk.receivables.create({
        ...data,
        type: 'invoice'
      });
      await MoniteMonitoringService.logApiCall('receivables.create', true);
      return response;
    } catch (error) {
      await MoniteMonitoringService.logApiCall('receivables.create', false, { error });
      throw error;
    }
  }
}