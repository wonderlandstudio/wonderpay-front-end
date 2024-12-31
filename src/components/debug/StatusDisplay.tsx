import React from 'react';

export function StatusDisplay() {
  const status = 'Connected';
  
  return (
    <div className="fixed bottom-4 right-4 text-sm text-gray-500">
      Status: {status}
    </div>
  );
}