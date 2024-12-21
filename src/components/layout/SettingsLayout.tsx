import React from 'react';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <main className="flex-1 overflow-y-auto px-6 backdrop-blur-md bg-white/50">
      {children}
    </main>
  );
};

export default SettingsLayout;