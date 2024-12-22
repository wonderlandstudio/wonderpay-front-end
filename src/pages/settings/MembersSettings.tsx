import React from 'react';
import { Card } from "@/components/ui/card";
import { useSettings } from '@/contexts/SettingsContext';
import { AddMemberDialog } from '@/components/members/AddMemberDialog';

const MembersSettings = () => {
  const { settings } = useSettings();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Team Members</h1>
          <p className="text-gray-500 mt-2">Manage your team members and their roles.</p>
        </div>
        <div className="flex gap-4">
          <AddMemberDialog />
        </div>
      </div>
      
      <Card className="p-6 space-y-8 bg-white/50">
        <div className="text-sm text-gray-500">No team members added yet.</div>
      </Card>
    </div>
  );
};

export default MembersSettings;