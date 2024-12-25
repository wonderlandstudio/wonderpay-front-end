import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Mail, Phone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ContactsListProps {
  type: 'all' | 'client' | 'vendor';
  searchQuery: string;
}

// Mock data - will be replaced with real data from Supabase
const mockContacts = [
  {
    id: '1',
    name: 'Acme Corp',
    type: 'vendor',
    email: 'contact@acme.com',
    phone: '+1 234 567 890',
    status: 'active',
    lastTransaction: '2024-03-15',
    balance: 1500.00
  },
  {
    id: '2',
    name: 'TechStart Inc',
    type: 'client',
    email: 'billing@techstart.com',
    phone: '+1 234 567 891',
    status: 'active',
    lastTransaction: '2024-03-10',
    balance: -2500.00
  }
];

export const ContactsList = ({ type, searchQuery }: ContactsListProps) => {
  const filteredContacts = mockContacts
    .filter(contact => 
      (type === 'all' || contact.type === type) &&
      (contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       contact.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Transaction</TableHead>
            <TableHead className="text-right">Balance</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredContacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="font-medium">{contact.name}</TableCell>
              <TableCell>
                <Badge variant={contact.type === 'client' ? 'default' : 'secondary'}>
                  {contact.type}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {contact.status}
                </Badge>
              </TableCell>
              <TableCell>{contact.lastTransaction}</TableCell>
              <TableCell className="text-right">
                <span className={contact.balance < 0 ? 'text-red-500' : 'text-green-500'}>
                  ${Math.abs(contact.balance).toFixed(2)}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};