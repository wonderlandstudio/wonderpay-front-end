import { MoniteAuthService } from '../auth/moniteAuth';
import { MoniteMonitoringService } from '../monitoring/moniteMonitoring';

export class PayableService {
  static async getPayables() {
    console.log('Fetching payables from Monite');
    const sdk = await MoniteAuthService.initializeSDK();
    const response = await sdk.payables.getAll();
    await MoniteMonitoringService.logApiCall('payables.getAll', true);
    return response.data || [];
  }
}