import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockTransactions = [
  {
    id: 'TRX-001',
    date: '2024-03-15',
    description: 'Payment to Vendor A',
    amount: 1500.00,
    status: 'Completed'
  },
  {
    id: 'TRX-002',
    date: '2024-03-14',
    description: 'Invoice Payment',
    amount: 2500.00,
    status: 'Completed'
  },
  // Add more mock transactions as needed
];

const TransactionHistory = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Transaction History</h1>
        <p className="text-gray-500 mt-2">View and manage all your transactions</p>
      </div>

      <Card className="p-6 bg-white/50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    {transaction.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default TransactionHistory;