import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, MoreVertical, Plus } from 'lucide-react';

const MembersSettings = () => {
  const members = [
    { name: 'Mitch Eisner', email: 'mitch@thewonderlandstudio.co', role: 'Administrator' },
    { name: 'Flow Finance', email: 'wonderland@flowfi.com', role: 'Bookkeeper' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Members</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add user
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add user</DialogTitle>
              <DialogDescription>
                The user will receive an email with instructions on how to create their Tola account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">First name</label>
                  <Input />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Last name</label>
                  <Input />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <Input type="email" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Role</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="bookkeeper">Bookkeeper</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-2 space-y-2 text-sm text-gray-500">
                  <p>• Administrators can edit settings and edit or pay all bills.</p>
                  <p>• Bookkeepers can view all bills but cannot create, edit or pay them.</p>
                  <p>• Users can only view, edit or pay bills they created.</p>
                </div>
              </div>
            </div>
            <Button className="w-full">Send invitation</Button>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="max-w-3xl p-6 space-y-6 bg-white/50">
        <div className="flex items-center gap-2 text-gray-500">
          <Users size={20} />
          <span className="text-lg">Members</span>
        </div>

        <div className="space-y-2">
          {members.map((member, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white">
              <div>
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{member.role}</span>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MembersSettings;