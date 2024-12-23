import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, ArrowDown, X } from "lucide-react";
import { StatusCard } from '@/components/receivables/StatusCard';
import { ReceivableItem } from '@/components/receivables/ReceivableItem';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Receivable {
  id: string;
  clientName: string;
  invoiceNumber: string;
  status: 'draft' | 'sent' | 'paid';
  dueDate: string;
  amount: number;
}

const Receivables = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['draft', 'sent', 'paid']);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Sample data grouped by month
  const receivables: Record<string, Receivable[]> = {
    'November': [
      {
        id: '52',
        clientName: 'SuperBloom House | Israa Saed & Aele Saed',
        invoiceNumber: '52',
        status: 'draft',
        dueDate: '2024-11-01',
        amount: 18000.00
      }
    ],
    'October': [
      {
        id: 'SBH10-24',
        clientName: 'SuperBloom House | Israa Saed & Aele Saed',
        invoiceNumber: 'SBH10-24',
        status: 'draft',
        dueDate: '2024-10-01',
        amount: 18000.00
      }
    ],
    'September': [
      {
        id: 'ARC-CPE102',
        clientName: 'CPE | Callie Stanton & Jordi Valles',
        invoiceNumber: '#ARC-CPE102',
        status: 'paid',
        dueDate: '2024-09-27',
        amount: 10000.00
      },
      {
        id: 'ARC-BSK102',
        clientName: 'BLUE SKY LODGE | Joe Ogdie & Callie Stanton',
        invoiceNumber: 'ARC-BSK102',
        status: 'sent',
        dueDate: '2024-09-27',
        amount: 10000.00
      },
      {
        id: 'ARC-102',
        clientName: "MATTEI'S | Joern Schwaiger & Callie Stanton",
        invoiceNumber: '#ARC-102',
        status: 'paid',
        dueDate: '2024-09-27',
        amount: 10000.00
      }
    ]
  };

  const totals = useMemo(() => {
    const result = { draft: 0, sent: 0, paid: 0 };
    Object.values(receivables).flat().forEach(receivable => {
      result[receivable.status] += receivable.amount;
    });
    return result;
  }, [receivables]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-medium">Get paid</h1>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <StatusCard title="Draft" amount={totals.draft} status="draft" />
        <StatusCard title="Sent" amount={totals.sent} status="sent" />
        <StatusCard title="Paid" amount={totals.paid} status="paid" />
      </div>

      <div className="flex gap-4 items-center bg-gray-100/80 rounded-lg p-2">
        <div className="relative flex-1 flex items-center">
          <Search className="absolute left-3 text-gray-500 h-4 w-4" />
          <Input 
            className="pl-10 border-none bg-transparent" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuCheckboxItem
              checked={selectedFilters.includes('draft')}
              onCheckedChange={() => toggleFilter('draft')}
            >
              Draft
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedFilters.includes('sent')}
              onCheckedChange={() => toggleFilter('sent')}
            >
              Sent
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedFilters.includes('paid')}
              onCheckedChange={() => toggleFilter('paid')}
            >
              Paid
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button 
          variant="ghost" 
          className="gap-2"
          onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
        >
          <ArrowDown className="h-4 w-4" />
          Due {sortOrder === 'asc' ? 'earliest' : 'latest'}
        </Button>
        {(searchQuery || selectedFilters.length < 3) && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSearchQuery('');
              setSelectedFilters(['draft', 'sent', 'paid']);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-8">
        {Object.entries(receivables).map(([month, items]) => (
          <div key={month} className="space-y-4">
            <h2 className="text-base text-gray-500">{month}</h2>
            <div className="space-y-2">
              {items
                .filter(item => 
                  selectedFilters.includes(item.status) &&
                  (item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   item.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()))
                )
                .sort((a, b) => {
                  const dateA = new Date(a.dueDate).getTime();
                  const dateB = new Date(b.dueDate).getTime();
                  return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
                })
                .map((receivable) => (
                  <ReceivableItem key={receivable.id} {...receivable} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Receivables;