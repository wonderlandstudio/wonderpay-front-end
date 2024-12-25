import React from 'react';
import OverviewSection from '@/components/dashboard/OverviewSection';
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
                {transactions.map((transaction, index) => (
                  <TableRow 
                    key={index} 
                    className="hover:bg-black/5 cursor-pointer transition-colors duration-200"
                  >
                    <TableCell className="flex items-center gap-3 py-4">
                      <div className="w-10 h-10 bg-gray-100/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-gray-300/50 rounded-full" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 font-inter">{transaction.name}</span>
                        <span className="text-sm text-gray-500 font-inter">{transaction.id}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-orange-500 font-medium font-inter">{transaction.status}</span>
                        <span className="text-sm text-gray-500 font-inter">{transaction.date}</span>
                        <span className="font-medium text-gray-900 font-inter">${transaction.amount.toLocaleString()}</span>
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
