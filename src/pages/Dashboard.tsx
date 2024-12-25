import React from 'react';
import { useDashboardData } from '@/hooks/use-dashboard-data';
import OverviewSection from '@/components/dashboard/OverviewSection';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Dashboard = () => {
  const { data: dashboardData, isLoading, error } = useDashboardData();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load dashboard data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const recentTransactions = dashboardData?.transactions || [];

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
                {recentTransactions.map((transaction, index) => (
                  <TableRow 
                    key={index} 
                    className="hover:bg-black/5 cursor-pointer transition-colors duration-200"
                  >
                    <TableCell className="flex items-center gap-3 py-4">
                      <div className="w-10 h-10 bg-gray-100/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-gray-300/50 rounded-full" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 font-inter">
                          {transaction.description || 'Transaction'}
                        </span>
                        <span className="text-sm text-gray-500 font-inter">
                          {transaction.id}
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
                          ${transaction.value.toLocaleString()}
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