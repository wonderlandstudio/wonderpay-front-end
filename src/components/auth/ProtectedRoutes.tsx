import { Navigate, Outlet } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { MoniteAuthGuard } from './MoniteAuthGuard';
import DashboardLayout from '../layout/DashboardLayout';

interface ProtectedRoutesProps {
  session: Session | null;
  requiresMonite?: boolean;
  children?: React.ReactNode;
}

export const ProtectedRoutes = ({ session, requiresMonite, children }: ProtectedRoutesProps) => {
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout>
      {requiresMonite ? (
        <MoniteAuthGuard>
          {children || <Outlet />}
        </MoniteAuthGuard>
      ) : (
        children || <Outlet />
      )}
    </DashboardLayout>
  );
};