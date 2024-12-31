import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import Loading from '@/components/loading';
import { APP_PATH } from '../index.enum';

// Lazy load Login page
const LoginView = lazy(() => import('@/pages/login'));

export const LOGIN_ROUTES = [
  <Route
    key="login"
    path={APP_PATH.LOGIN}
    element={
      <Suspense fallback={<Loading />}>
        <LoginView />
      </Suspense>
    }
  />,
];
