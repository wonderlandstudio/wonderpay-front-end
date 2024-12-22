import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import SettingsLayout from '@/components/layout/SettingsLayout';

interface ProfileData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar?: string;
  authenticatorEnabled: boolean;
  recurringInvoices: boolean;
}

const ProfileSettings = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileData>({
    firstName: 'Mitch',
    lastName: 'Eisner',
    phoneNumber: '+1 310 490 6571',
    authenticatorEnabled: false,
    recurringInvoices: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: keyof ProfileData) => {
    setProfile(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to save the profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <SettingsLayout>
      <div className="max-w-3xl mx-auto py-8 space-y-6">
        <h1 className="text-3xl font-semibold mb-8">Profile</h1>

        <Card className="p-6 space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg text-gray-600">Picture</h2>
            <Avatar className="w-16 h-16">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback className="bg-gray-100 text-gray-500 text-2xl">
                {profile.firstName?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-gray-600">First name</label>
              <Input
                name="firstName"
                value={profile.firstName}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-600">Last name</label>
              <Input
                name="lastName"
                value={profile.lastName}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-gray-600">Phone number</label>
            <Input
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleInputChange}
              className="w-full"
              type="tel"
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="px-8">
              Save
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">Enable authenticator app</h2>
              <p className="text-gray-500">
                Use an authentication app or browser extension to get two-factor
                authentication codes when prompted.
              </p>
            </div>
            <Switch
              checked={profile.authenticatorEnabled}
              onCheckedChange={() => handleSwitchChange('authenticatorEnabled')}
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Early access</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-lg text-gray-600">Recurring Invoices</h3>
                  <p className="text-gray-500">Create recurring invoices</p>
                </div>
                <Switch
                  checked={profile.recurringInvoices}
                  onCheckedChange={() => handleSwitchChange('recurringInvoices')}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </SettingsLayout>
  );
};

export default ProfileSettings;