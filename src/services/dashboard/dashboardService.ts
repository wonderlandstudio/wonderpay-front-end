import { MoniteAuthService } from '../auth/moniteAuth';

interface Transaction {
  date: string;
  value: number;
}

interface DashboardData {
  balance: number;
  income: number;
  expenses: number;
  transactions: Transaction[];
}

export class DashboardService {
  static async getDashboardOverview(): Promise<DashboardData> {
    console.log('Fetching dashboard overview data');
    
    const sdk = await MoniteAuthService.initializeSDK();
    
    const [payablesResponse, receivablesResponse] = await Promise.all([
      sdk.payables.getAll(),
      sdk.receivables.getAll()
    ]);
    
    const payables = payablesResponse.data || [];
    const receivables = receivablesResponse.data || [];

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