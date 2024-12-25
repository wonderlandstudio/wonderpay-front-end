import { MoniteAuthService, type PayableResponse } from '../auth/moniteAuth';

export class PayableService {
  static async getPayables(): Promise<PayableResponse[]> {
    console.log('Fetching payables from Monite');
    const sdk = await MoniteAuthService.initializeSDK();
    const response = await sdk.payable.getAll();
    return response.data || [];
  }
}