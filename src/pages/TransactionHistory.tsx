import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Transaction } from '@/types/payments';
import { TransactionsList } from '@/components/bill-pay/TransactionsList';
import { BillPayFilters } from '@/components/bill-pay/BillPayFilters';

const TransactionHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Mock data - will be replaced with actual API calls
  const transactions: Transaction[] = [
    {
      id: '1',
      vendorName: 'Acme Corp',
      invoiceNumber: 'INV-001',
      status: 'paid',
      dueDate: '2024-01-15',
      amount: 1500.00
    },
    {
      id: '2',
      vendorName: 'Tech Solutions',
      invoiceNumber: 'INV-002',
      status: 'scheduled',
      dueDate: '2024-02-01',
      amount: 2500.00
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Transaction History</h1>
          <p className="text-gray-500 mt-2">View and manage all your transactions.</p>
        </div>
      </div>

      <Card className="p-6 space-y-6 bg-white/50">
        <BillPayFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <TransactionsList transactions={transactions} />
      </Card>
    </div>
  );
};

export default TransactionHistory;