import { MoniteAPIService } from '../api/MoniteAPIService';

export class ReceivableService {
  static async getReceivables() {
    try {
      const moniteAPI = MoniteAPIService.getInstance();
      const response = await moniteAPI.callAPI('receivable', 'getAll');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching receivables:', error);
      throw error;
    }
  }

  static async createReceivable(data: any) {
    try {
      const moniteAPI = MoniteAPIService.getInstance();
      const response = await moniteAPI.callAPI('receivable', 'create', data);
      return response;
    } catch (error) {
      console.error('Error creating receivable:', error);
      throw error;
    }
  }
}