import { MoniteAuthService } from '../auth/moniteAuth';

export class PayableService {
  static async getPayables() {
    console.log('Fetching payables from Monite');
    const sdk = await MoniteAuthService.initializeSDK();
    const response = await sdk.api.payables.getAll();
    return response.data || [];
  }
}