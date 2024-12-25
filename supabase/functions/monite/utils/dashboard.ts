import { corsHeaders } from './cors.ts';

interface DashboardData {
  balance: number;
  income: number;
  expenses: number;
  transactions: Array<{
    date: string;
    value: number;
  }>;
}

export async function getDashboardData(apiUrl: string, accessToken: string): Promise<DashboardData> {
  console.log('Fetching payables data...');
  const payablesResponse = await fetch(`${apiUrl}/payables`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'x-monite-version': '2023-06-04',
    },
  });

  console.log('Fetching receivables data...');
  const receivablesResponse = await fetch(`${apiUrl}/receivables`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'x-monite-version': '2023-06-04',
    },
  });

  if (!payablesResponse.ok || !receivablesResponse.ok) {
    console.error('Failed to fetch data:', {
      payablesStatus: payablesResponse.status,
      receivablesStatus: receivablesResponse.status
    });
    throw new Error('Failed to fetch dashboard data');
  }

  const [payables, receivables] = await Promise.all([
    payablesResponse.json(),
    receivablesResponse.json(),
  ]);

  console.log('Successfully fetched payables and receivables data');

  const expenses = payables.data?.reduce((sum: number, item: any) => sum + (item.amount || 0), 0) || 0;
  const income = receivables.data?.reduce((sum: number, item: any) => sum + (item.amount || 0), 0) || 0;
  const balance = income - expenses;

  const transactions = [...(payables.data || []), ...(receivables.data || [])]
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .map((item: any) => ({
      date: item.created_at.split('T')[0],
      value: item.amount || 0
    }));

  return {
    balance,
    income,
    expenses,
    transactions
  };
}