import { PayableService } from '../payables/payableService';
import { ReceivableService } from '../receivables/receivableService';
import { MoniteMonitoringService } from '../monitoring/moniteMonitoring';

interface DashboardData {
  balance: number;
  income: number;
  expenses: number;
  transactions: Array<{
    date: string;
    value: number;
  }>;
}

export class DashboardService {
  static async getDashboardOverview(): Promise<DashboardData> {
    console.log('Fetching dashboard overview data');
    
    try {
      const [payables, receivables] = await Promise.all([
        PayableService.getPayables().catch(error => {
          console.error('Error fetching payables:', error);
          return [];
        }),
        ReceivableService.getReceivables().catch(error => {
          console.error('Error fetching receivables:', error);
          return [];
        })
      ]);
      
      await MoniteMonitoringService.logApiCall('dashboard.overview', true);

      const expenses = payables.reduce((sum, item) => {
        return sum + (item.total_amount || 0);
      }, 0);

      const income = receivables.reduce((sum, item) => {
        return sum + (item.total_amount || 0);
      }, 0);

      const balance = income - expenses;

      const transactions = [...payables, ...receivables]
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        .map(item => ({
          date: item.created_at.split('T')[0],
          value: item.total_amount || 0
        }));

      return {
        balance,
        income,
        expenses,
        transactions
      };
    } catch (error) {
      console.error('Error in getDashboardOverview:', error);
      await MoniteMonitoringService.logApiCall('dashboard.overview', false, { error });
      throw error;
    }
  }
}