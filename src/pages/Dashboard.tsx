import React from 'react';
import OverviewSection from '@/components/dashboard/OverviewSection';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import type { Transaction } from '@/types/common';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Website Development',
    vendorName: 'Tech Solutions Inc',
    invoiceNumber: 'INV-2024-001',
    status: 'paid',
    date: '2024-03-01',
    amount: 2500.00,
    currency: 'USD',
    recipient: 'Tech Solutions Inc'
  },
  {
    id: '2',
    description: 'Marketing Services',
    vendorName: 'Digital Marketing Pro',
    invoiceNumber: 'INV-2024-002',
    status: 'pending',
    date: '2024-03-05',
    amount: 1500.00,
    currency: 'USD',
    recipient: 'Digital Marketing Pro'
  },
  {
    id: '3',
    description: 'Office Supplies',
    vendorName: 'Office Depot',
    invoiceNumber: 'INV-2024-003',
    status: 'overdue',
    date: '2024-02-28',
    amount: 750.00,
    currency: 'USD',
    recipient: 'Office Depot'
  }
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <OverviewSection />
      
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 font-inter">Recent Transactions</h2>
          <span className="text-sm text-gray-500 font-inter">Last 30 days</span>
        </div>

        <Card className="border-gray-200/50 backdrop-blur-lg bg-white/50 shadow-lg">
          <CardContent className="p-0">
            <Table>
              <TableBody>
                {mockTransactions.map((transaction) => (
                  <TableRow 
                    key={transaction.id} 
                    className="hover:bg-black/5 cursor-pointer transition-colors duration-200"
                  >
                    <TableCell className="flex items-center gap-3 py-4">
                      <div className="w-10 h-10 bg-gray-100/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-gray-300/50 rounded-full" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 font-inter">
                          {transaction.description}
                        </span>
                        <span className="text-sm text-gray-500 font-inter">
                          {transaction.invoiceNumber}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end">
                        <span className={`${
                          transaction.status === 'overdue' ? 'text-orange-500' : 
                          transaction.status === 'paid' ? 'text-green-500' : 
                          'text-gray-500'
                        } font-medium font-inter`}>
                          {transaction.status}
                        </span>
                        <span className="text-sm text-gray-500 font-inter">
                          {new Date(transaction.date).toLocaleDateString()}
                        </span>
                        <span className="font-medium text-gray-900 font-inter">
                          ${transaction.amount.toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;