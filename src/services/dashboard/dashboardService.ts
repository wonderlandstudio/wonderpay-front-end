export const DashboardService = {
  getDashboardOverview: async () => {
    return {
      totalReceivables: 0,
      totalPayables: 0,
      cashFlow: 0,
      recentTransactions: [],
    };
  },
};