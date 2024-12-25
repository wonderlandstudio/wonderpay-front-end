import { MoniteAuthService } from '../auth/moniteAuth';

export class ReceivableService {
  static async getReceivables() {
    console.log('Fetching receivables from Monite');
    const sdk = await MoniteAuthService.initializeSDK();
    const response = await sdk.receivables.getAll();
    return response.data || [];
  }

  static async createInvoice(data: any) {
    console.log('Creating invoice with data:', data);
    const sdk = await MoniteAuthService.initializeSDK();
    return sdk.receivables.create(data);
  }
}