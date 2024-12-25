import { PayableService } from '../payables/payableService';
import { ReceivableService } from '../receivables/receivableService';

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
    
    const [payables, receivables] = await Promise.all([
      PayableService.getPayables(),
      ReceivableService.getReceivables()
    ]);
    
    const expenses = payables.reduce((sum, item) => {
      const amount = typeof item.total_amount === 'object' ? 
        Number(item.total_amount?.value) : 
        Number(item.total_amount);
      return sum + (amount || 0);
    }, 0);

    const income = receivables.reduce((sum, item) => {
      const amount = typeof item.total_amount === 'object' ? 
        Number(item.total_amount?.value) : 
        Number(item.total_amount);
      return sum + (amount || 0);
    }, 0);

    const balance = income - expenses;

    const transactions = [...payables, ...receivables]
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      .map(item => ({
        date: item.created_at.split('T')[0],
        value: typeof item.total_amount === 'object' ? 
          Number(item.total_amount?.value) : 
          Number(item.total_amount)
      }));

    return {
      balance,
      income,
      expenses,
      transactions
    };
  }
}