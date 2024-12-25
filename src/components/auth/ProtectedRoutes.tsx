import { Navigate, Outlet } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { MoniteAuthGuard } from './MoniteAuthGuard';
import DashboardLayout from '../layout/DashboardLayout';

interface ProtectedRoutesProps {
  session: Session | null;
  requiresMonite?: boolean;
}

export const ProtectedRoutes = ({ session, requiresMonite }: ProtectedRoutesProps) => {
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout>
      {requiresMonite ? (
        <MoniteAuthGuard>
          <Outlet />
        </MoniteAuthGuard>
      ) : (
        <Outlet />
      )}
    </DashboardLayout>
  );
};