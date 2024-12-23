import { Transaction } from '@/types/payments';
import { TransactionItem } from './TransactionItem';

interface TransactionsListProps {
  transactions: Transaction[];
}

export function TransactionsList({ transactions }: TransactionsListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium text-gray-500">Recent transactions</h2>
      <div className="space-y-2">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} {...transaction} />
        ))}
      </div>
    </div>
  );
}