import React, { useState, useMemo } from 'react';
import { BillPayHeader } from '@/components/bill-pay/BillPayHeader';
import { BillPayFilters } from '@/components/bill-pay/BillPayFilters';
import { StatusCard } from '@/components/bill-pay/StatusCard';
import { TransactionsList } from '@/components/bill-pay/TransactionsList';
import { Transaction } from '@/types/payments';

const BillPay = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['draft', 'scheduled', 'paid', 'overdue']);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Placeholder data - will be replaced with backend data
  const recentTransactions: Transaction[] = [
    {
      id: '1',
      vendorName: '24/7 Productions',
      invoiceNumber: '240-23',
      status: 'overdue',
      dueDate: '2024-10-11',
      amount: 10500.00,
      currency: 'USD',
      date: '2024-01-11',
      recipient: '24/7 Productions Inc.'
    },
    {
      id: '2',
      vendorName: 'ABC Services',
      invoiceNumber: '241-23',
      status: 'draft',
      dueDate: '2024-12-15',
      amount: 5000.00,
      currency: 'USD',
      date: '2024-01-15',
      recipient: 'ABC Services LLC'
    },
    {
      id: '3',
      vendorName: 'XYZ Corp',
      invoiceNumber: '242-23',
      status: 'scheduled',
      dueDate: '2024-11-20',
      amount: 7500.00,
      currency: 'USD',
      date: '2024-01-20',
      recipient: 'XYZ Corporation'
    },
    {
      id: '4',
      vendorName: 'Tech Solutions',
      invoiceNumber: '243-23',
      status: 'paid',
      dueDate: '2024-10-01',
      amount: 3000.00,
      currency: 'USD',
      date: '2024-01-01',
      recipient: 'Tech Solutions Inc.'
    },
  ];

  const filteredAndSortedTransactions = useMemo(() => {
    console.log('Filtering and sorting transactions:', { searchQuery, selectedFilters, sortOrder });
    return recentTransactions
      .filter(transaction => 
        selectedFilters.includes(transaction.status) &&
        (transaction.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         transaction.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .sort((a, b) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
  }, [recentTransactions, selectedFilters, searchQuery, sortOrder]);

  const totals = useMemo(() => {
    console.log('Calculating totals for transactions');
    return recentTransactions.reduce((acc, transaction) => {
      acc[transaction.status] = (acc[transaction.status] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);
  }, [recentTransactions]);

  return (
    <div className="p-6 space-y-6">
      <BillPayHeader />

      <div className="grid md:grid-cols-3 gap-6">
        <StatusCard title="Draft" amount={totals.draft || 0} />
        <StatusCard title="Scheduled" amount={totals.scheduled || 0} />
        <StatusCard title="Paid" amount={totals.paid || 0} />
      </div>

      <BillPayFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <TransactionsList transactions={filteredAndSortedTransactions} />
    </div>
  );
};

export default BillPay;