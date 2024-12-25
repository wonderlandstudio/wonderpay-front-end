import { MoniteSDK } from '@monite/sdk-api';
import { MoniteAuthService } from '../auth/moniteAuth';
import { MoniteMonitoringService } from '../monitoring/moniteMonitoring';
import { MoniteAPIService } from '../api/MoniteAPIService';

export class PayableService {
  static async getPayables() {
    console.log('Fetching payables from Monite');
    const api = await MoniteAPIService.getInstance();
    const sdk = api.getSDK() as MoniteSDK;
    
    try {
      const response = await sdk.api.payable.getAll();
      await MoniteMonitoringService.logApiCall('payables.getAll', true);
      return response.data || [];
    } catch (error) {
      await MoniteMonitoringService.logApiCall('payables.getAll', false, { error });
      throw error;
    }
  }
}