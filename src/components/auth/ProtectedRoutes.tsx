import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { MoniteAuthGuard } from './MoniteAuthGuard';

interface ProtectedRoutesProps {
  requiresMonite?: boolean;
  children?: React.ReactNode;
}

export const ProtectedRoutes = ({ requiresMonite, children }: ProtectedRoutesProps) => {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return requiresMonite ? (
    <MoniteAuthGuard>
      {children || <Outlet />}
    </MoniteAuthGuard>
  ) : (
    children || <Outlet />
  );
};