import { corsHeaders } from './cors.ts';

export async function getDashboardData(accessToken: string) {
  const apiUrl = Deno.env.get('MONITE_API_URL') || 'https://api.sandbox.monite.com/v1';
  
  console.log('Fetching payables and receivables data...');
  
  const [payablesResponse, receivablesResponse] = await Promise.all([
    fetch(`${apiUrl}/payables`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'x-monite-version': '2023-06-04',
      },
    }),
    fetch(`${apiUrl}/receivables`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'x-monite-version': '2023-06-04',
      },
    })
  ]);

  if (!payablesResponse.ok || !receivablesResponse.ok) {
    console.error('Failed to fetch data:', {
      payablesStatus: payablesResponse.status,
      receivablesStatus: receivablesResponse.status
    });
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch dashboard data',
        details: {
          payables: await payablesResponse.text(),
          receivables: await receivablesResponse.text()
        }
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
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