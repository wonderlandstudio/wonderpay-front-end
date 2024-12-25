import { MoniteSDK } from '@monite/sdk-api';
import { MoniteClient } from '../monite/MoniteClient';
import { MoniteMonitoringService } from '../monitoring/moniteMonitoring';
import { RequestInterceptor } from './interceptors/RequestInterceptor';
import { ErrorInterceptor } from './interceptors/ErrorInterceptor';
import { statusTracker } from '../monitoring/StatusTracker';

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
      await statusTracker.log('MoniteAPIService', 'Initializing service', 'info');
      this.sdk = await MoniteClient.getInstance();
      await statusTracker.log('MoniteAPIService', 'Initialized successfully', 'success');
      await MoniteMonitoringService.logApiCall('api.initialize', true);
    } catch (error) {
      await statusTracker.log('MoniteAPIService', 'Failed to initialize', 'error', { error });
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
      await statusTracker.log('MoniteAPIService', 'SDK not initialized, initializing now', 'warning');
      await this.initialize();
    }

    try {
      await statusTracker.log('MoniteAPIService', `Calling ${service}.${method}`, 'info', { params });

      const config = await RequestInterceptor.intercept(this.sdk!, { 
        service, 
        method, 
        params 
      });

      const serviceInstance = this.sdk!.api[service];
      const response = await serviceInstance[method](params);

      await statusTracker.log('MoniteAPIService', `${service}.${method} succeeded`, 'success');
      await MoniteMonitoringService.logApiCall(`api.${service}.${method}`, true);
      return response as T;
    } catch (error) {
      await statusTracker.log('MoniteAPIService', `${service}.${method} failed`, 'error', { error });
      await MoniteMonitoringService.logApiCall(`api.${service}.${method}`, false, { error });
      return ErrorInterceptor.handleError(error);
    }
  }

  getSDK(): MoniteSDK | null {
    return this.sdk;
  }
}