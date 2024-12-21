import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const transactions = [
  {
    id: 'SBH10-24',
    name: 'SuperBloom House | Israa Saed & Aele Saed',
    date: 'Oct 1',
    amount: 18000.00,
    status: 'Overdue'
  },
  {
    id: 'SBH10-24',
    name: 'SuperBloom House | Israa Saed & Aele Saed',
    date: 'Oct 1',
    amount: 18000.00,
    status: 'Overdue'
  }
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Recent Transactions</h1>
        <span className="text-gray-500">Last 30 days</span>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index} className="hover:bg-gray-50/50">
                  <TableCell className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    <div className="flex flex-col">
                      <span className="font-medium">{transaction.name}</span>
                      <span className="text-sm text-gray-500">{transaction.id}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-orange-500 font-medium">{transaction.status}</span>
                      <span className="text-gray-500">{transaction.date}</span>
                      <span className="font-medium">${transaction.amount.toLocaleString()}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;