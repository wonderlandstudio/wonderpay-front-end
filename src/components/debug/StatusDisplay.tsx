import { useStatusTracker } from '@/hooks/use-status-tracker';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { StatusLevel, mapStatusLevelToVariant } from '@/types/monitoring';

const StatusDisplay = () => {
  const { data: logs } = useStatusTracker();

  const getIcon = (level: StatusLevel) => {
    switch (level) {
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return <Info className="h-4 w-4 text-info" />;
    }
  };

  if (!logs?.length) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 rounded-lg shadow-lg border">
      <div className="p-4">
        <h3 className="font-semibold mb-2">System Status</h3>
        <ScrollArea className="h-[300px]">
          <div className="space-y-2">
            {logs.map((log, index) => (
              <Alert 
                key={index} 
                variant={mapStatusLevelToVariant(log.level)}
                className="text-xs"
              >
                <div className="flex gap-2 items-start">
                  {getIcon(log.level)}
                  <AlertDescription>
                    <span className="font-medium">{log.component}:</span>{' '}
                    {log.message}
                    {log.details && (
                      <pre className="mt-1 text-[10px] bg-muted p-1 rounded">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    )}
                  </AlertDescription>
                </div>
              </Alert>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default StatusDisplay;