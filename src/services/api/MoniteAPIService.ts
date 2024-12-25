import { MoniteSDK } from '@monite/sdk-api';
import { MoniteClient } from '../monite/MoniteClient';
import { MoniteMonitoringService } from '../monitoring/moniteMonitoring';

export class MoniteAPIService {
  private static instance: MoniteAPIService;
  private sdk: MoniteSDK | null = null;

  private constructor() {}

  static getInstance(): MoniteAPIService {
    if (!this.instance) {
      this.instance = new MoniteAPIService();
    }
    return this.instance;
  }

  async initialize(): Promise<void> {
    try {
      this.sdk = await MoniteClient.getInstance();
      console.log('MoniteAPIService initialized successfully');
      await MoniteMonitoringService.logApiCall('api.initialize', true);
    } catch (error) {
      console.error('Failed to initialize MoniteAPIService:', error);
      await MoniteMonitoringService.logApiCall('api.initialize', false, { error });
      throw error;
    }
  }

  async callAPI<T>(
    endpoint: string,
    method: string,
    params?: any
  ): Promise<T> {
    if (!this.sdk) {
      await this.initialize();
    }

    try {
      const response = await this.sdk?.api[endpoint](params);
      await MoniteMonitoringService.logApiCall(`api.${endpoint}`, true);
      return response as T;
    } catch (error) {
      console.error(`API call failed for ${endpoint}:`, error);
      await MoniteMonitoringService.logApiCall(`api.${endpoint}`, false, { error });
      throw error;
    }
  }

  getSDK(): MoniteSDK | null {
    return this.sdk;
  }
}