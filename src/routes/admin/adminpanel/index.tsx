import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute/AdminGuard';
import Loading from '@/components/loading';
import Unauthorized from '@/pages/Unauthorized';
import { ADMIN_PATH } from '../index.enum';

const AdminPanelView = lazy(() => import('@/pages/Adminpanel'));

export const ADMIN_ROUTES = [
  <Route
    key="admin-panel"
    path={ADMIN_PATH.ADMIN_PANEL}
    element={
      <ProtectedRoute requiredStatus="admin">
        <Suspense fallback={<Loading />}>
          <AdminPanelView />
        </Suspense>
      </ProtectedRoute>
    }
  />,
  <Route
    key="unauthorized"
    path={ADMIN_PATH.UNAUTHORIZED}
    element={<Unauthorized />}
  />,
];
