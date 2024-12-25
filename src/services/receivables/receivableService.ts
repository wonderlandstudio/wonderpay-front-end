import { MoniteAuthService } from '../auth/moniteAuth';
import type { CreateReceivablesRequest } from '@monite/sdk-api';

export class ReceivableService {
  static async getReceivables() {
    console.log('Fetching receivables from Monite');
    const sdk = await MoniteAuthService.initializeSDK();
    const response = await sdk.api.receivables.getAll();
    return response.data || [];
  }

  static async createInvoice(data: CreateReceivablesRequest) {
    console.log('Creating invoice with data:', data);
    const sdk = await MoniteAuthService.initializeSDK();
    return sdk.api.receivables.create(data);
  }
}