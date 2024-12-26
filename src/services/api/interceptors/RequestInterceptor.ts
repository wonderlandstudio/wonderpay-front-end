import { MoniteSDK } from '@monite/sdk-api';

export class RequestInterceptor {
  static async intercept(sdk: MoniteSDK, config: any) {
    // Add common headers
    config.headers = {
      ...config.headers,
      'x-monite-version': '2024-05-25',
    };

    // Log request
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });

    return config;
  }
}