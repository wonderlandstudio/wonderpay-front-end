import { MoniteAuthService, type ReceivableResponse } from '../auth/moniteAuth';
import type { CreateReceivablePayload } from '@monite/sdk-api';

export class ReceivableService {
  static async getReceivables(): Promise<ReceivableResponse[]> {
    console.log('Fetching receivables from Monite');
    const sdk = await MoniteAuthService.initializeSDK();
    const response = await sdk.receivable.getAll();
    return response.data || [];
  }

  static async createInvoice(data: CreateReceivablePayload) {
    console.log('Creating invoice with data:', data);
    const sdk = await MoniteAuthService.initializeSDK();
    return sdk.receivable.create(data);
  }
}