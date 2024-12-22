import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSettings } from '@/contexts/SettingsContext';
import { Plus } from 'lucide-react';

const MembersSettings = () => {
  const { settings, saveSettings } = useSettings();
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await saveSettings();
      toast({
        title: "Members saved",
        description: "Team member changes have been successfully saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save member changes. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Team Members</h1>
          <p className="text-gray-500 mt-2">Manage your team members and their roles.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add member
          </Button>
          <Button onClick={handleSave}>Save changes</Button>
        </div>
      </div>
      
      <Card className="p-6 space-y-8 bg-white/50">
        <div className="text-sm text-gray-500">No team members added yet.</div>
      </Card>
    </div>
  );
};

export default MembersSettings;