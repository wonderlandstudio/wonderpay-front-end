import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface Address {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Settings {
  businessName: string;
  displayName: string;
  website: string;
  description: string;
  brandColor: string;
  logo?: string;
  address?: Address;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  saveSettings: () => Promise<void>;
}

const defaultSettings: Settings = {
  businessName: 'Wonderland Studio Los Angeles LLC',
  displayName: 'Wonderland Studio',
  website: 'http://www.thewonderlandstudio.co',
  description: '',
  brandColor: '#9b87f5',
  address: {
    street: '',
    unit: '',
    city: '',
    state: 'CA',
    zipCode: '',
    country: 'US'
  }
};

const SETTINGS_STORAGE_KEY = 'app_settings';

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Settings>(() => {
    // Load settings from localStorage on initial render
    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  // Update localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      return updated;
    });
  };

  const saveSettings = async () => {
    try {
      // Here you would typically make an API call to save the settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
      console.log('Settings saved:', settings);
      
      toast({
        title: "Settings saved",
        description: "Your settings have been successfully updated.",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}