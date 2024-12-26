import React from 'react';
import { Card } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface OverviewCardProps {
  title: string;
  value: number;
  Icon: LucideIcon;
  trend?: 'positive' | 'negative' | 'neutral';
}

const OverviewCard = ({ title, value, Icon, trend = 'neutral' }: OverviewCardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className="p-6 bg-white/50 backdrop-blur-sm hover:bg-white/60 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${getTrendColor()} bg-gray-50`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">{title}</div>
          <div className="text-2xl font-semibold">
            ${value.toLocaleString()}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OverviewCard;