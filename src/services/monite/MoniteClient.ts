import { MoniteSDK } from '@monite/sdk-api';
import { MoniteMonitoringService } from '../monitoring/moniteMonitoring';

export class MoniteClient {
  private sdk: MoniteSDK;
  private static instance: MoniteClient;

  private constructor(sdk: MoniteSDK) {
    this.sdk = sdk;
  }

  static async initialize(token: string): Promise<MoniteClient> {
    if (!this.instance) {
      try {
        const sdk = new MoniteSDK({
          fetchToken: async () => token,
          apiUrl: process.env.VITE_MONITE_API_URL,
        });
        await sdk.authenticate();
        this.instance = new MoniteClient(sdk);
        await MoniteMonitoringService.logApiCall('initialize', true);
      } catch (error) {
        console.error('Error initializing Monite SDK:', error);
        await MoniteMonitoringService.logApiCall('initialize', false, { error });
        throw error;
      }
    }
    return this.instance;
  }

  getSDK(): MoniteSDK {
    return this.sdk;
  }

  async createEntity(data: any) {
    try {
      const response = await this.sdk.api.entity.create(data);
      await MoniteMonitoringService.logApiCall('entity.create', true);
      return response.data;
    } catch (error) {
      console.error('Error creating Monite entity:', error);
      await MoniteMonitoringService.logApiCall('entity.create', false, { error });
      throw error;
    }
  }

  async getEntity(entityId: string) {
    try {
      const response = await this.sdk.api.entity.getById(entityId);
      await MoniteMonitoringService.logApiCall('entity.get', true);
      return response.data;
    } catch (error) {
      console.error('Error getting Monite entity:', error);
      await MoniteMonitoringService.logApiCall('entity.get', false, { error });
      throw error;
    }
  }

  async updateEntity(entityId: string, data: any) {
    try {
      const response = await this.sdk.api.entity.update(entityId, data);
      await MoniteMonitoringService.logApiCall('entity.update', true);
      return response.data;
    } catch (error) {
      console.error('Error updating Monite entity:', error);
      await MoniteMonitoringService.logApiCall('entity.update', false, { error });
      throw error;
    }
  }

  async deleteEntity(entityId: string) {
    try {
      await this.sdk.api.entity.delete(entityId);
      await MoniteMonitoringService.logApiCall('entity.delete', true);
      return true;
    } catch (error) {
      console.error('Error deleting Monite entity:', error);
      await MoniteMonitoringService.logApiCall('entity.delete', false, { error });
      throw error;
    }
  }

  async listEntities(params?: any) {
    try {
      const response = await this.sdk.api.entity.getAll(params);
      await MoniteMonitoringService.logApiCall('entity.list', true);
      return response.data;
    } catch (error) {
      console.error('Error listing Monite entities:', error);
      await MoniteMonitoringService.logApiCall('entity.list', false, { error });
      throw error;
    }
  }

  async createPaymentLink(data: any) {
    try {
      const response = await this.sdk.api.paymentLink.create(data);
      await MoniteMonitoringService.logApiCall('paymentLink.create', true);
      return response.data;
    } catch (error) {
      console.error('Error creating payment link:', error);
      await MoniteMonitoringService.logApiCall('paymentLink.create', false, { error });
      throw error;
    }
  }

  async getPaymentLink(linkId: string) {
    try {
      const response = await this.sdk.api.paymentLink.getById(linkId);
      await MoniteMonitoringService.logApiCall('paymentLink.get', true);
      return response.data;
    } catch (error) {
      console.error('Error getting payment link:', error);
      await MoniteMonitoringService.logApiCall('paymentLink.get', false, { error });
      throw error;
    }
  }
}