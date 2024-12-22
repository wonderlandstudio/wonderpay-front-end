import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSettings } from '@/contexts/SettingsContext';

const AddressSettings = () => {
  const { settings, updateSettings, saveSettings } = useSettings();
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await saveSettings();
      toast({
        title: "Address saved",
        description: "Your address has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save address. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Address</h1>
          <p className="text-gray-500 mt-2">The address on this page is included on invoices sent by your company.</p>
        </div>
        <Button onClick={handleSave}>Save changes</Button>
      </div>
      
      <Card className="max-w-3xl p-6 space-y-8 bg-white/50">
        <div className="space-y-4">
          <h2 className="text-2xl font-medium">Company address</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-1.5 block">Street name</label>
              <Input 
                placeholder="Find address..."
                value={settings.address?.street || ''}
                onChange={(e) => updateSettings({ address: { ...settings.address, street: e.target.value }})}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1.5 block">
                Apt / Unit
                <span className="text-gray-400 ml-2">(Optional)</span>
              </label>
              <Input 
                value={settings.address?.unit || ''}
                onChange={(e) => updateSettings({ address: { ...settings.address, unit: e.target.value }})}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1.5 block">City</label>
                <Input 
                  value={settings.address?.city || ''}
                  onChange={(e) => updateSettings({ address: { ...settings.address, city: e.target.value }})}
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-600 mb-1.5 block">State</label>
                <Select 
                  value={settings.address?.state || ''}
                  onValueChange={(value) => updateSettings({ address: { ...settings.address, state: value }})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 mb-1.5 block">ZIP code</label>
                <Input 
                  value={settings.address?.zipCode || ''}
                  onChange={(e) => updateSettings({ address: { ...settings.address, zipCode: e.target.value }})}
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1.5 block">Country</label>
              <Select 
                value={settings.address?.country || 'US'}
                onValueChange={(value) => updateSettings({ address: { ...settings.address, country: value }})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="MX">Mexico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AddressSettings;