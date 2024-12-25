import { MoniteSDK } from '@monite/sdk-api';
import { MoniteAuthService } from '../auth/moniteAuth';
import { MoniteMonitoringService } from '../monitoring/moniteMonitoring';

export class PayableService {
  static async getPayables() {
    console.log('Fetching payables from Monite');
    const sdk = await MoniteAuthService.initializeSDK() as MoniteSDK;
    const response = await sdk.api.payables.getAll();
    await MoniteMonitoringService.logApiCall('payables.getAll', true);
    return response.data || [];
  }
}