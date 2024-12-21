import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import SettingsLayout from '@/components/layout/SettingsLayout';

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
  const [formData, setFormData] = useState({
    businessName: 'Wonderland Studio Los Angeles LLC',
    displayName: 'Wonderland Studio',
    website: 'http://www.thewonderlandstudio.co',
    description: '',
    brandColor: '#9b87f5'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleColorChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      brandColor: value
    }));
  };

  return (
    <SettingsLayout>
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">General</h1>
        
        <Card className="max-w-3xl p-6 space-y-8 border-gray-200/50 backdrop-blur-lg bg-white/50">
          <div className="space-y-4">
            <h2 className="text-lg text-gray-600">Company logo</h2>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-medium text-gray-500">W</span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg text-gray-600">Business name</h2>
            <Input 
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg text-gray-600">Display name</h2>
            <Input 
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              className="w-full"
            />
            <p className="text-sm text-gray-500">How your organization name will be displayed within Tola.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg text-gray-600">Website</h2>
            <Input 
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="w-full"
            />
            <p className="text-sm text-gray-500">Your company's website.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg text-gray-600">Description</h2>
            <Textarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full h-32"
              placeholder="A brief description of what your company does."
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg text-gray-600">Brand color</h2>
            <RadioGroup
              value={formData.brandColor}
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