export class MoniteAPIService {
  private static instance: MoniteAPIService;

  static getInstance() {
    if (!this.instance) {
      this.instance = new MoniteAPIService();
    }
    return this.instance;
  }

  async initialize() {
    console.log('Mock API service initialized');
  }

  async callAPI(service: string, method: string, ...args: any[]) {
    console.log('Mock API call:', { service, method, args });
    return [];
  }

  getSDK() {
    return {};
  }
}