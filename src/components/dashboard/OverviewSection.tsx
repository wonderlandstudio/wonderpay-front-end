import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp, ChevronDown, Wallet, Loader2 } from "lucide-react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMoniteDashboard } from '@/hooks/use-monite-dashboard';
import { toast } from '@/hooks/use-toast';

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

  return (
    <div className="space-y-8 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-gray-100 rounded-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors">
              Last {selectedPeriod} days
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem onClick={() => setSelectedPeriod('30')}>
                Last 30 days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedPeriod('60')}>
                Last 60 days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedPeriod('90')}>
                Last 90 days
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white">
              <div className="flex items-center gap-4">
                <Wallet className="h-6 w-6 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Balance</div>
                  <div className="text-2xl font-semibold">
                    ${data?.balance.toLocaleString() ?? '0.00'}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white">
              <div className="flex items-center gap-4">
                <ArrowDown className="h-6 w-6 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Income</div>
                  <div className="text-2xl font-semibold">
                    {data?.income !== null ? `$${data.income.toLocaleString()}` : '—'}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white">
              <div className="flex items-center gap-4">
                <ArrowUp className="h-6 w-6 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Expenses</div>
                  <div className="text-2xl font-semibold">
                    ${data?.expenses.toLocaleString() ?? '0.00'}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-white mt-8">
            <ChartContainer className="h-[300px]">
              <AreaChart 
                data={data?.transactions ?? []} 
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  tickFormatter={(value) => `${value/1000}k`}
                />
                <ChartTooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={2}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ChartContainer>
          </Card>
        </>
      )}
    </div>
  );
};

export default OverviewSection;