import { MoniteSDK } from '@monite/sdk-api';
import { MoniteClient } from '../monite/MoniteClient';
import { MoniteMonitoringService } from '../monitoring/moniteMonitoring';
import { RequestInterceptor } from './interceptors/RequestInterceptor';
import { ErrorInterceptor } from './interceptors/ErrorInterceptor';

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
    service: 'payable' | 'receivable',
    method: string,
    params?: any
  ): Promise<T> {
    if (!this.sdk) {
      await this.initialize();
    }

    try {
      const config = await RequestInterceptor.intercept(this.sdk!, { 
        service, 
        method, 
        params 
      });

      const serviceInstance = this.sdk!.api[service];
      const response = await serviceInstance[method](params);

      await MoniteMonitoringService.logApiCall(`api.${service}.${method}`, true);
      return response as T;
    } catch (error) {
      console.error(`API call failed for ${service}.${method}:`, error);
      await MoniteMonitoringService.logApiCall(`api.${service}.${method}`, false, { error });
      return ErrorInterceptor.handleError(error);
    }
  }

  getSDK(): MoniteSDK | null {
    return this.sdk;
  }
}