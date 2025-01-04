import React from 'react';
import { ArrowDown, ArrowUp, Wallet, LayoutDashboard } from "lucide-react";
import OverviewCard from './overview/OverviewCard';
import PeriodSelector from './overview/PeriodSelector';
import TransactionsChart from './overview/TransactionsChart';

interface ChartDataPoint {
  date: string;
  value: number;
}

const mockChartData: ChartDataPoint[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  value: Math.floor(Math.random() * 10000)
}));

const OverviewSection: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('30');

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OverviewCard
          title="Balance"
          value={25000}
          Icon={Wallet}
          trend="neutral"
        />
        <OverviewCard
          title="Income"
          value={12500}
          Icon={ArrowDown}
          trend="positive"
        />
        <OverviewCard
          title="Expenses"
          value={8750}
          Icon={ArrowUp}
          trend="negative"
        />
      </div>

      <TransactionsChart 
        transactions={mockChartData}
        isLoading={false}
      />
    </div>
  );
};

export default OverviewSection;