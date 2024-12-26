import React from 'react';
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { Loader2 } from "lucide-react";

interface TransactionsChartProps {
  transactions: Array<{
    date: string;
    value: number;
  }>;
  isLoading?: boolean;
}

const chartConfig = {
  transactions: {
    label: "Transactions",
    theme: {
      light: "#8884d8",
      dark: "#8884d8"
    }
  }
};

const TransactionsChart = ({ transactions, isLoading }: TransactionsChartProps) => {
  if (isLoading) {
    return (
      <Card className="p-6 bg-white/50 backdrop-blur-sm h-[300px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          <span className="text-sm text-gray-500">Loading chart data...</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white/50 backdrop-blur-sm">
      <ChartContainer config={chartConfig} className="h-[300px]">
        <AreaChart 
          data={transactions} 
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
  );
};

export default TransactionsChart;