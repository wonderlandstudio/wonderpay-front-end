import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useSettings } from '@/contexts/SettingsContext';
import { supabase } from "@/integrations/supabase/client";

const OrganizationSettings = () => {
  const { toast } = useToast();
  const { settings, updateSettings, saveSettings } = useSettings();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setupMoniteEntity = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const { data: entity, error } = await supabase
          .from('entities')
          .select('monite_entity_id')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (error) {
          throw error;
        }

        // If no Monite entity exists, create one
        if (!entity?.monite_entity_id) {
          console.log('No Monite entity found, creating one...');
          
          // Get fresh session token
          const { data: { session: currentSession } } = await supabase.auth.getSession();
          if (!currentSession?.access_token) {
            throw new Error('No valid session token');
          }

          const response = await supabase.functions.invoke('create-monite-entity', {
            headers: {
              Authorization: `Bearer ${currentSession.access_token}`
            }
          });
          
          if (response.error) {
            console.error('Edge function error:', response.error);
            throw new Error(response.error.message || 'Failed to create Monite entity');
          }

          toast({
            title: "Success",
            description: "Your organization has been set up with Monite.",
          });
        }
      } catch (error) {
        console.error('Error setting up Monite entity:', error);
        toast({
          title: "Error",
          description: "Failed to set up your organization with Monite.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    setupMoniteEntity();
  }, [toast]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveSettings();
      toast({
        title: "Success",
        description: "Organization settings have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save organization settings.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

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