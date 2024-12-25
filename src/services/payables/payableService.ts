import { MoniteAuthService } from '../auth/moniteAuth';

export class PayableService {
  static async getPayables() {
    console.log('Fetching payables from Monite');
    const sdk = await MoniteAuthService.initializeSDK();
    const response = await sdk.payable.getAll();
    return response.data || [];
  }
}