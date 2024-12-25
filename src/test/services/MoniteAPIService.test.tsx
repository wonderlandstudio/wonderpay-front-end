import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MoniteAPIService } from '@/services/api/MoniteAPIService';
import { MoniteClient } from '@/services/monite/MoniteClient';
import { statusTracker } from '@/services/monitoring/StatusTracker';

// Mock MoniteClient
vi.mock('@/services/monite/MoniteClient', () => ({
  MoniteClient: {
    getInstance: vi.fn(() => Promise.resolve({
      api: {
        payable: {
          getAll: vi.fn(),
        },
        receivable: {
          getAll: vi.fn(),
        }
      }
    }))
  }
}));

// Mock status tracker
vi.mock('@/services/monitoring/StatusTracker', () => ({
  statusTracker: {
    log: vi.fn(),
    getLogs: vi.fn(() => []),
  }
}));

describe('MoniteAPIService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize successfully', async () => {
    const service = MoniteAPIService.getInstance();
    await service.initialize();
    expect(MoniteClient.getInstance).toHaveBeenCalled();
    expect(statusTracker.log).toHaveBeenCalledWith(
      'MoniteAPIService',
      'Initialized successfully',
      'success'
    );
  });

  it('should handle API calls successfully', async () => {
    const service = MoniteAPIService.getInstance();
    await service.initialize();

    const mockResponse = { data: [] };
    vi.mocked(MoniteClient.getInstance).mockImplementationOnce(() => Promise.resolve({
      api: {
        payable: {
          getAll: vi.fn().mockResolvedValue(mockResponse)
        },
        receivable: {
          getAll: vi.fn()
        }
      }
    }));

    const result = await service.callAPI('payable', 'getAll');
    expect(result).toEqual(mockResponse);
    expect(statusTracker.log).toHaveBeenCalledWith(
      'MoniteAPIService',
      'payable.getAll succeeded',
      'success'
    );
  });

  it('should handle API errors', async () => {
    const service = MoniteAPIService.getInstance();
    await service.initialize();

    const mockError = new Error('API Error');
    vi.mocked(MoniteClient.getInstance).mockImplementationOnce(() => Promise.resolve({
      api: {
        payable: {
          getAll: vi.fn().mockRejectedValue(mockError)
        },
        receivable: {
          getAll: vi.fn()
        }
      }
    }));

    await expect(service.callAPI('payable', 'getAll')).rejects.toThrow();
    expect(statusTracker.log).toHaveBeenCalledWith(
      'MoniteAPIService',
      'payable.getAll failed',
      'error',
      expect.any(Object)
    );
  });
});