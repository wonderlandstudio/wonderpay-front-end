import React from 'react';
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis } from "recharts";

interface TransactionsChartProps {
  transactions: Array<{
    date: string;
    value: number;
  }>;
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

const TransactionsChart = ({ transactions }: TransactionsChartProps) => {
  return (
    <Card className="p-6 bg-white mt-8">
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