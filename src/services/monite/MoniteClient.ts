export class MoniteClient {
  private static instance: any;

  static async getInstance() {
    if (!this.instance) {
      this.instance = {
        api: {
          payable: {},
          receivable: {},
        },
      };
    }
    return this.instance;
  }

  static resetInstance() {
    this.instance = null;
  }
}