export const MoniteMonitoringService = {
  logApiCall: async (name: string, success: boolean, details?: any) => {
    console.log('Mock monitoring log:', { name, success, details });
  },
  getRecentLogs: async () => {
    return [];
  },
};