export const PayableService = {
  getPayables: async () => {
    return [];
  },
  createPayable: async (data: any) => {
    console.log('Mock create payable:', data);
    return { id: 'mock-id' };
  },
};