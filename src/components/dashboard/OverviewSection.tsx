import React, { useState } from 'react';
import { ArrowDown, ArrowUp, Wallet, Loader2, LayoutDashboard } from "lucide-react";
import { useMoniteDashboard } from '@/hooks/use-monite-dashboard';
import { toast } from '@/hooks/use-toast';
import OverviewCard from './overview/OverviewCard';
import PeriodSelector from './overview/PeriodSelector';
import TransactionsChart from './overview/TransactionsChart';

const OverviewSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const { data, isLoading, error } = useMoniteDashboard();

  if (error) {
    console.error('Error fetching dashboard data:', error);
    toast({
      title: "Error",
      description: "Failed to load dashboard data. Please try again.",
      variant: "destructive",
    });
  }

  // Default values for when data is not available
  const dashboardData = {
    balance: data?.balance ?? 0,
    income: data?.income ?? 0,
    expenses: data?.expenses ?? 0,
    transactions: data?.transactions ?? []
  };

  return (
    <div className="space-y-8 pt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-gray-500" />
          <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
        </div>
        <div className="flex items-center gap-4">
          <PeriodSelector 
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          <p className="text-sm text-gray-500">Loading dashboard data...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <OverviewCard
              title="Balance"
              value={dashboardData.balance}
              Icon={Wallet}
              trend="neutral"
            />
            <OverviewCard
              title="Income"
              value={dashboardData.income}
              Icon={ArrowDown}
              trend="positive"
            />
            <OverviewCard
              title="Expenses"
              value={dashboardData.expenses}
              Icon={ArrowUp}
              trend="negative"
            />
          </div>

          <TransactionsChart 
            transactions={dashboardData.transactions} 
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
};

export default OverviewSection;