import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, ArrowDown, X, Plus } from "lucide-react";
import { StatusCard } from '@/components/receivables/StatusCard';
import { ReceivableItem } from '@/components/receivables/ReceivableItem';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type InvoiceStatus = 'draft' | 'sent' | 'paid';

// Mock data for receivables with correct status types
const mockReceivables: Record<string, Array<{
  id: string;
  clientName: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  dueDate: string;
  amount: number;
  details: {
    items: Array<{
      description: string;
      quantity: number;
      rate: number;
      amount: number;
    }>;
    subtotal: number;
    tax: number;
    total: number;
  };
}>> = {
  'November 2024': [
    {
      id: 'INV-001',
      clientName: 'SuperBloom House',
      invoiceNumber: 'SBH-2024-001',
      status: 'draft',
      dueDate: '2024-11-15',
      amount: 18500.00,
      details: {
        items: [
          { description: 'Design Services', quantity: 1, rate: 15000, amount: 15000 },
          { description: 'Consultation', quantity: 10, rate: 350, amount: 3500 }
        ],
        subtotal: 18500,
        tax: 1850,
        total: 20350
      }
    }
  ],
  'October 2024': [
    {
      id: 'INV-002',
      clientName: 'Coastal Properties',
      invoiceNumber: 'CP-2024-010',
      status: 'sent',
      dueDate: '2024-10-30',
      amount: 12000.00,
      details: {
        items: [
          { description: 'Property Management - Q4', quantity: 1, rate: 12000, amount: 12000 }
        ],
        subtotal: 12000,
        tax: 1200,
        total: 13200
      }
    },
    {
      id: 'INV-003',
      clientName: 'Urban Development Co',
      invoiceNumber: 'UDC-2024-015',
      status: 'paid',
      dueDate: '2024-10-15',
      amount: 25000.00,
      details: {
        items: [
          { description: 'Project Planning', quantity: 1, rate: 15000, amount: 15000 },
          { description: 'Site Analysis', quantity: 1, rate: 10000, amount: 10000 }
        ],
        subtotal: 25000,
        tax: 2500,
        total: 27500
      }
    }
  ]
};

const Receivables = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<InvoiceStatus[]>(['draft', 'sent', 'paid']);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const totals = {
    draft: 18500.00,
    sent: 12000.00,
    paid: 25000.00
  };

  const toggleFilter = (filter: InvoiceStatus) => {
    setSelectedFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-medium">Receivables</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Invoice
        </Button>
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
            placeholder="Search invoices..." 
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
          <ArrowDown className={`h-4 w-4 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
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
        {Object.entries(mockReceivables).map(([month, items]) => (
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
                  <ReceivableItem 
                    key={receivable.id} 
                    {...receivable} 
                    details={receivable.details}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Receivables;