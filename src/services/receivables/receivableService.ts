import { MoniteAuthService } from '../auth/moniteAuth';
import type { CreateInvoiceRequest } from '@monite/sdk-api';

export class ReceivableService {
  static async getReceivables() {
    console.log('Fetching receivables from Monite');
    const sdk = await MoniteAuthService.initializeSDK();
    const response = await sdk.api.receivable.getAll();
    return response.data || [];
  }

  static async createInvoice(data: CreateInvoiceRequest) {
    console.log('Creating invoice with data:', data);
    const sdk = await MoniteAuthService.initializeSDK();
    return sdk.api.receivable.create(data);
  }
}