import React from 'react';
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PeriodSelectorProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

const PeriodSelector = ({ selectedPeriod, onPeriodChange }: PeriodSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-gray-100 rounded-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors">
        Last {selectedPeriod} days
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => onPeriodChange('30')}>
          Last 30 days
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onPeriodChange('60')}>
          Last 60 days
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onPeriodChange('90')}>
          Last 90 days
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PeriodSelector;