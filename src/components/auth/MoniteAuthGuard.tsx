import React from 'react';

interface MoniteAuthGuardProps {
  children: React.ReactNode;
}

export function MoniteAuthGuard({ children }: MoniteAuthGuardProps) {
  return <>{children}</>;
}