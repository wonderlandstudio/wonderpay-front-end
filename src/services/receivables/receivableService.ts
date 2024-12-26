import type { MoniteSDK, CreatePaymentLinkRequest } from '@monite/sdk-api';
import { MoniteAPIService } from '../api/MoniteAPIService';
import { MoniteMonitoringService } from '../monitoring/moniteMonitoring';
import * as ReceivableTransformer from '../api/transformers/ReceivableTransformer';

export class ReceivableService {
  static async getReceivables() {
    console.log('Fetching receivables from Monite');
    const api = await MoniteAPIService.getInstance();
    const sdk = api.getSDK() as MoniteSDK;
    
    try {
      const response = await sdk.api.receivables.getAll();
      await MoniteMonitoringService.logApiCall('receivables.getAll', true);
      return response.data.map(receivable => ReceivableTransformer.fromMonite(receivable));
    } catch (error) {
      console.error('Error fetching receivables:', error);
      await MoniteMonitoringService.logApiCall('receivables.getAll', false, { error });
      throw error;
    }
  }

  static async createReceivable(data: CreatePaymentLinkRequest) {
    console.log('Creating receivable in Monite');
    const api = await MoniteAPIService.getInstance();
    const sdk = api.getSDK() as MoniteSDK;
    
    try {
      const response = await sdk.api.receivables.create(data);
      await MoniteMonitoringService.logApiCall('receivables.create', true);
      return ReceivableTransformer.fromMonite(response);
    } catch (error) {
      console.error('Error creating receivable:', error);
      await MoniteMonitoringService.logApiCall('receivables.create', false, { error });
      throw error;
    }
  }
}