import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import SettingsLayout from '@/components/layout/SettingsLayout';
import { useSettings } from '@/contexts/SettingsContext';

const brandColors = [
  { name: 'Neutral Gray', value: '#8E9196' },
  { name: 'Primary Purple', value: '#9b87f5' },
  { name: 'Secondary Purple', value: '#7E69AB' },
  { name: 'Dark Purple', value: '#1A1F2C' },
  { name: 'Light Purple', value: '#D6BCFA' },
  { name: 'Soft Green', value: '#F2FCE2' },
  { name: 'Soft Yellow', value: '#FEF7CD' },
  { name: 'Soft Orange', value: '#FEC6A1' },
  { name: 'Soft Purple', value: '#E5DEFF' },
  { name: 'Soft Pink', value: '#FFDEE2' },
  { name: 'Ocean Blue', value: '#0EA5E9' },
  { name: 'Charcoal Gray', value: '#403E43' },
  { name: 'Bright Blue', value: '#1EAEDB' },
  { name: 'Magenta Pink', value: '#D946EF' },
  { name: 'Vivid Purple', value: '#8B5CF6' },
];

const OrganizationSettings = () => {
  const { settings, updateSettings, saveSettings } = useSettings();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateSettings({ [name]: value });
  };

  const handleColorChange = (value: string) => {
    updateSettings({ brandColor: value });
  };

  const handleSave = async () => {
    try {
      await saveSettings();
      toast({
        title: "Settings saved",
        description: "Your changes have been successfully saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <SettingsLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">General</h1>
          <Button onClick={handleSave}>Save changes</Button>
        </div>
        
        <Card className="max-w-3xl p-6 space-y-8 border-gray-200/50 backdrop-blur-lg bg-white/50">
          <div className="space-y-4">
            <h2 className="text-lg text-gray-600 text-left">Company logo</h2>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-medium text-gray-500">W</span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg text-gray-600 text-left">Business name</h2>
            <Input 
              name="businessName"
              value={settings.businessName}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg text-gray-600 text-left">Display name</h2>
            <Input 
              name="displayName"
              value={settings.displayName}
              onChange={handleInputChange}
              className="w-full"
            />
            <p className="text-sm text-gray-500">How your organization name will be displayed within Tola.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg text-gray-600 text-left">Website</h2>
            <Input 
              name="website"
              value={settings.website}
              onChange={handleInputChange}
              className="w-full"
            />
            <p className="text-sm text-gray-500">Your company's website.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg text-gray-600 text-left">Description</h2>
            <Textarea 
              name="description"
              value={settings.description}
              onChange={handleInputChange}
              className="w-full h-32"
              placeholder="A brief description of what your company does."
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg text-gray-600 text-left">Brand color</h2>
            <RadioGroup
              value={settings.brandColor}
              onValueChange={handleColorChange}
              className="grid grid-cols-3 gap-4"
            >
              {brandColors.map((color) => (
                <div key={color.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={color.value} id={color.value} className="peer sr-only" />
                  <Label
                    htmlFor={color.value}
                    className="flex items-center space-x-2 rounded-md border-2 border-muted p-2 hover:border-accent peer-data-[state=checked]:border-primary cursor-pointer"
                  >
                    <div 
                      className="w-6 h-6 rounded-full" 
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="text-sm">{color.name}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </Card>
      </div>
    </SettingsLayout>
  );
};

export default OrganizationSettings;