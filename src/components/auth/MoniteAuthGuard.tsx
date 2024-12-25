import { useMoniteAuth } from '@/hooks/use-monite-auth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

interface MoniteAuthGuardProps {
  children: React.ReactNode;
}

export function MoniteAuthGuard({ children }: MoniteAuthGuardProps) {
  const { isAuthenticated, isLoading, error } = useMoniteAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Authentication Error</AlertTitle>
        <AlertDescription>
          There was an error verifying your Monite authentication status.
          Please try again or contact support if the issue persists.
        </AlertDescription>
      </Alert>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Alert variant="default" className="mb-4">
          <AlertTitle>Monite Setup Required</AlertTitle>
          <AlertDescription>
            You need to configure your Monite integration before accessing this feature.
          </AlertDescription>
        </Alert>
        <Button onClick={() => navigate('/dashboard/settings/accounting')}>
          Configure Monite
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}