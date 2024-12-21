import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";

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
        <h1 className="text-xl font-semibold text-gray-900">Recent Transactions</h1>
        <span className="text-sm text-gray-500">Last 30 days</span>
      </div>

      <Card className="border-gray-200">
        <CardContent className="p-0">
          <Table>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index} className="hover:bg-gray-50/50 cursor-pointer">
                  <TableCell className="flex items-center gap-3 py-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-gray-300 rounded-full" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{transaction.name}</span>
                      <span className="text-sm text-gray-500">{transaction.id}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-orange-500 font-medium">{transaction.status}</span>
                      <span className="text-sm text-gray-500">{transaction.date}</span>
                      <span className="font-medium text-gray-900">${transaction.amount.toLocaleString()}</span>
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