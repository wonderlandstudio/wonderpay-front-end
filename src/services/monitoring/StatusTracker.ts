import { MoniteMonitoringService } from './moniteMonitoring';
import type { StatusLevel, StatusEntry } from '@/types/monitoring';

class StatusTracker {
  private static instance: StatusTracker;
  private logs: StatusEntry[] = [];
  private maxLogs: number = 100;

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
    const entry: StatusEntry = {
      component,
      message,
      level,
      timestamp: new Date(),
      details
    };
    
    // Add to in-memory logs with size limit
    this.logs.unshift(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }
    
    // Log to console with appropriate styling
    const styles = this.getLogStyles(level);
    console.log(
      `%c[${level.toUpperCase()}] ${component}: ${message}`,
      styles,
      details || ''
    );
    
    // Persist to Monite audit logs
    await MoniteMonitoringService.logApiCall(
      'status_tracker',
      level !== 'error',
      { ...entry }
    );
  }

  private getLogStyles(level: StatusLevel): string {
    switch (level) {
      case 'error':
        return 'color: #ef4444; font-weight: bold';
      case 'warning':
        return 'color: #f59e0b; font-weight: bold';
      case 'success':
        return 'color: #10b981; font-weight: bold';
      default:
        return 'color: #3b82f6; font-weight: bold';
    }
  }

  getLogs(): StatusEntry[] {
    return [...this.logs];
  }

  getLastLog(): StatusEntry | undefined {
    return this.logs[0];
  }

  clear() {
    this.logs = [];
  }
}

export const statusTracker = StatusTracker.getInstance();