import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus } from "lucide-react";
import { ContactsList } from '@/components/contacts/ContactsList';
import { AddContactDialog } from '@/components/contacts/AddContactDialog';

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium">Clients & Vendors</h1>
          <p className="text-gray-500 mt-1">Manage your business relationships</p>
        </div>
        <AddContactDialog />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
          </TabsList>
          
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search contacts..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all">
          <ContactsList type="all" searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="clients">
          <ContactsList type="client" searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="vendors">
          <ContactsList type="vendor" searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Clients;