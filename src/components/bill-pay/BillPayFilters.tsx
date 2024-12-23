import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BillPayFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
}

export function BillPayFilters({
  searchQuery,
  setSearchQuery,
  selectedFilters,
  setSelectedFilters,
  sortOrder,
  setSortOrder
}: BillPayFiltersProps) {
  const toggleFilter = (filter: string) => {
    const newFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter(f => f !== filter)
      : [...selectedFilters, filter];
    setSelectedFilters(newFilters);
  };

  const toggleSortOrder = () => {
    const newOrder: 'asc' | 'desc' = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
  };

  return (
    <div className="flex gap-4 items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input 
          className="pl-10 bg-white/50 backdrop-blur-sm" 
          placeholder="Search by vendor or invoice number..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
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
            checked={selectedFilters.includes('scheduled')}
            onCheckedChange={() => toggleFilter('scheduled')}
          >
            Scheduled
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedFilters.includes('paid')}
            onCheckedChange={() => toggleFilter('paid')}
          >
            Paid
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={selectedFilters.includes('overdue')}
            onCheckedChange={() => toggleFilter('overdue')}
          >
            Overdue
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button 
        variant="outline" 
        className="gap-2"
        onClick={toggleSortOrder}
      >
        <ArrowUpDown className="h-4 w-4" />
        Due {sortOrder === 'asc' ? 'soonest' : 'latest'}
      </Button>
    </div>
  );
}