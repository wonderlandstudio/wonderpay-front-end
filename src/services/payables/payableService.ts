import type { MoniteSDK } from '@monite/sdk-api';
import { MoniteAPIService } from '../api/MoniteAPIService';
import { MoniteMonitoringService } from '../monitoring/moniteMonitoring';
import type { MonitePayable } from '@/types/payments';
import { PayableTransformer } from '../api/transformers/PayableTransformer';

export class PayableService {
  static async getPayables() {
    console.log('Fetching payables from Monite');
    const api = await MoniteAPIService.getInstance();
    const sdk = api.getSDK() as MoniteSDK;
    
    try {
      const response = await sdk.api.payable.getAllPayables();
      await MoniteMonitoringService.logApiCall('payables.getAll', true);
      return response.data.map(payable => PayableTransformer.fromMonite(payable));
    } catch (error) {
      await MoniteMonitoringService.logApiCall('payables.getAll', false, { error });
      throw error;
    }
  }
}