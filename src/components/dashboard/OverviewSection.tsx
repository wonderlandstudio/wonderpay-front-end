import React from 'react';
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Wallet } from "lucide-react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis } from "recharts";

const data = [
  { date: '23', value: 500 },
  { date: '24', value: 600 },
  { date: '25', value: 550 },
  { date: '26', value: 500 },
  { date: '27', value: 500 },
  { date: '28', value: 500 },
  { date: '29', value: 5000 },
  { date: '30', value: 5000 },
  { date: 'Dec', value: 5000 },
  { date: '02', value: 5000 },
  { date: '03', value: 500 },
  { date: '04', value: 500 },
];

const OverviewSection = () => {
  return (
    <div className="space-y-8 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 rounded-full px-4 py-2 text-sm">Last 30 days</div>
          <div className="bg-gray-100 rounded-full px-4 py-2 text-sm flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Rho Business Bank... ****6092
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-white">
          <div className="flex items-center gap-4">
            <Wallet className="h-6 w-6 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Balance</div>
              <div className="text-2xl font-semibold">${(268.60).toLocaleString()}</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-center gap-4">
            <ArrowDown className="h-6 w-6 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Income</div>
              <div className="text-2xl font-semibold">—</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-center gap-4">
            <ArrowUp className="h-6 w-6 text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Expenses</div>
              <div className="text-2xl font-semibold">${(5631.00).toLocaleString()}</div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-white mt-8">
        <ChartContainer className="h-[300px]" config={{}}>
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
    </div>
  );
};

export default OverviewSection;