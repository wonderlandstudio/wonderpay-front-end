import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { StatusCard } from '@/components/bill-pay/StatusCard';
import { TransactionItem } from '@/components/bill-pay/TransactionItem';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Transaction {
  id: string;
  vendorName: string;
  invoiceNumber: string;
  status: 'draft' | 'scheduled' | 'paid' | 'overdue';
  dueDate: string;
  amount: number;
}

const BillPay = () => {
  const navigate = useNavigate();
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
      amount: 10500.00
    },
    {
      id: '2',
      vendorName: 'ABC Services',
      invoiceNumber: '241-23',
      status: 'draft',
      dueDate: '2024-12-15',
      amount: 5000.00
    },
    {
      id: '3',
      vendorName: 'XYZ Corp',
      invoiceNumber: '242-23',
      status: 'scheduled',
      dueDate: '2024-11-20',
      amount: 7500.00
    },
    {
      id: '4',
      vendorName: 'Tech Solutions',
      invoiceNumber: '243-23',
      status: 'paid',
      dueDate: '2024-10-01',
      amount: 3000.00
    },
  ];

  const filteredAndSortedTransactions = useMemo(() => {
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
    return recentTransactions.reduce((acc, transaction) => {
      acc[transaction.status] = (acc[transaction.status] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);
  }, [recentTransactions]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pay</h1>
        <Button onClick={() => navigate('/bill-pay/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add bill
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatusCard title="Draft" amount={totals.draft || 0} />
        <StatusCard title="Scheduled" amount={totals.scheduled || 0} />
        <StatusCard title="Paid" amount={totals.paid || 0} />
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input 
            className="pl-10 bg-white/50 backdrop-blur-sm" 
            placeholder="Search by vendor or invoice number..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuCheckboxItem
              checked={selectedFilters.includes('draft')}
              onCheckedChange={() => toggleFilter('draft')}
            >
              Draft
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedFilters.includes('scheduled')}
              onCheckedChange={() => toggleFilter('scheduled')}
            >
              Scheduled
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedFilters.includes('paid')}
              onCheckedChange={() => toggleFilter('paid')}
            >
              Paid
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedFilters.includes('overdue')}
              onCheckedChange={() => toggleFilter('overdue')}
            >
              Overdue
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={toggleSortOrder}
        >
          <ArrowUpDown className="h-4 w-4" />
          Due {sortOrder === 'asc' ? 'soonest' : 'latest'}
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-medium text-gray-500">Recent transactions</h2>
        <div className="space-y-2">
          {filteredAndSortedTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillPay;