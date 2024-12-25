import React from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";

const mockTransactions = [
  {
    id: 'SBH10-24',
    name: 'SuperBloom House | Israa Saed & Aele Saed',
    date: 'Oct 1',
    amount: 18000.00,
    status: 'Overdue'
  },
  {
    id: 'SBH11-24',
    name: 'SuperBloom House | John Doe',
    date: 'Oct 2',
    amount: 15000.00,
    status: 'Pending'
  }
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="pt-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">Overview</h1>
          <span className="text-sm text-gray-500">Last 30 days</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white/50 backdrop-blur-sm">
            <div className="space-y-2">
              <h3 className="text-sm text-gray-500">Balance</h3>
              <p className="text-2xl font-semibold">$45,000.00</p>
            </div>
          </Card>
          
          <Card className="p-6 bg-white/50 backdrop-blur-sm">
            <div className="space-y-2">
              <h3 className="text-sm text-gray-500">Income</h3>
              <p className="text-2xl font-semibold">$75,000.00</p>
            </div>
          </Card>
          
          <Card className="p-6 bg-white/50 backdrop-blur-sm">
            <div className="space-y-2">
              <h3 className="text-sm text-gray-500">Expenses</h3>
              <p className="text-2xl font-semibold">$30,000.00</p>
            </div>
          </Card>
        </div>

        <Card className="border-gray-200/50 backdrop-blur-lg bg-white/50">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h2>
            <Table>
              <TableBody>
                {mockTransactions.map((transaction, index) => (
                  <TableRow 
                    key={index} 
                    className="hover:bg-black/5 cursor-pointer transition-colors duration-200"
                  >
                    <TableCell className="flex items-center gap-3 py-4">
                      <div className="w-10 h-10 bg-gray-100/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-gray-300/50 rounded-full" />
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
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;