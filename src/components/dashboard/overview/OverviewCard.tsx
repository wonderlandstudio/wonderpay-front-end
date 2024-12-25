import React from 'react';
import { Card } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface OverviewCardProps {
  title: string;
  value: number;
  Icon: LucideIcon;
}

const OverviewCard = ({ title, value, Icon }: OverviewCardProps) => {
  return (
    <Card className="p-6 bg-white">
      <div className="flex items-center gap-4">
        <Icon className="h-6 w-6 text-gray-500" />
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          <div className="text-2xl font-semibold">
            ${value.toLocaleString()}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OverviewCard;