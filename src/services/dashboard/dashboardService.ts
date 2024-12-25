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
      const amount = typeof item.amount === 'number' ? 
        item.amount : 
        (item.amount?.value ?? 0);
      return sum + amount;
    }, 0);

    const income = receivables.reduce((sum, item) => {
      const amount = typeof item.amount === 'number' ? 
        item.amount : 
        (item.amount?.value ?? 0);
      return sum + amount;
    }, 0);

    const balance = income - expenses;

    const transactions = [...payables, ...receivables]
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      .map(item => ({
        date: item.created_at.split('T')[0],
        value: typeof item.amount === 'number' ? 
          item.amount : 
          (item.amount?.value ?? 0)
      }));

    return {
      balance,
      income,
      expenses,
      transactions
    };
  }
}