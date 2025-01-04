import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface OrganizationSettings {
  businessName: string;
  displayName: string;
  website: string;
  description: string;
  brandColor: string;
}

const defaultSettings: OrganizationSettings = {
  businessName: 'Wonderland Studio',
  displayName: 'Wonderland',
  website: 'https://wonderlandstudio.com',
  description: 'A creative studio specializing in music, entertainment, and luxury hospitality.',
  brandColor: '#1A1F2C'
};

const OrganizationSettings: React.FC = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<OrganizationSettings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);

  const updateSettings = (updates: Partial<OrganizationSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Organization settings have been saved.",
      });
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Organization Settings</h1>
          <p className="text-gray-500 mt-2">Manage your organization's settings and preferences.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save changes'
          )}
        </Button>
      </div>
      
      <Card className="p-6 space-y-8 bg-white/50">
        <div className="space-y-4">
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              value={settings.businessName}
              onChange={(e) => updateSettings({ businessName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              value={settings.displayName}
              onChange={(e) => updateSettings({ displayName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              type="url"
              id="website"
              value={settings.website}
              onChange={(e) => updateSettings({ website: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={settings.description}
              onChange={(e) => updateSettings({ description: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="brandColor" className="block text-sm font-medium text-gray-700">
              Brand Color
            </label>
            <input
              type="color"
              id="brandColor"
              value={settings.brandColor}
              onChange={(e) => updateSettings({ brandColor: e.target.value })}
              className="mt-1 h-10 w-20"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrganizationSettings;