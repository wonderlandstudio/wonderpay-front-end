import React from 'react';

const StatusDisplay = () => {
  const status = 'Connected';
  
  return (
    <div className="fixed bottom-4 right-4 text-sm text-gray-500">
      Status: {status}
    </div>
  );
};

export default StatusDisplay;