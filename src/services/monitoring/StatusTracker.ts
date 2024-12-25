import { MoniteMonitoringService } from './moniteMonitoring';

export type StatusLevel = 'info' | 'warning' | 'error' | 'success';

interface StatusEntry {
  component: string;
  message: string;
  level: StatusLevel;
  timestamp: Date;
  details?: Record<string, any>;
}

class StatusTracker {
  private static instance: StatusTracker;
  private logs: StatusEntry[] = [];

  private constructor() {}

  static getInstance(): StatusTracker {
    if (!this.instance) {
      this.instance = new StatusTracker();
    }
    return this.instance;
  }

  async log(
    component: string,
    message: string,
    level: StatusLevel,
    details?: Record<string, any>
  ) {
    const entry = {
      component,
      message,
      level,
      timestamp: new Date(),
      details
    };
    
    this.logs.push(entry);
    console.log(`[${level.toUpperCase()}] ${component}: ${message}`, details || '');
    
    // Also log to Monite audit logs for persistence
    await MoniteMonitoringService.logApiCall(
      'status_tracker',
      level !== 'error',
      { ...entry }
    );
  }

  getLogs(): StatusEntry[] {
    return [...this.logs];
  }

  getLastLog(): StatusEntry | undefined {
    return this.logs[this.logs.length - 1];
  }

  clear() {
    this.logs = [];
  }
}

export const statusTracker = StatusTracker.getInstance();