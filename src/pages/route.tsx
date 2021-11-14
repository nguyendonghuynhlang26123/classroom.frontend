import { RouteConfigs } from 'common/type';
import { Navigate } from 'react-router-dom';
import React from 'react';
import { LinearProgress } from '@mui/material';

// main screen
const Dashboard = React.lazy(() => import('./Dashboard'));
//Auth
const LoginPage = React.lazy(() => import('./Auth/Login'));
const RegisterPage = React.lazy(() => import('./Auth/Register'));

const Classroom = React.lazy(() => import('./Classroom'));

// Public routes
const Wrapper = ({ children }: { children: any }) => (
  <React.Suspense fallback={<LinearProgress />}>{children}</React.Suspense>
);

// Authed routes
const AuthWrapped = ({ isAuthed, children }: { isAuthed: boolean; children: any }) => {
  return isAuthed ? <Wrapper>{children}</Wrapper> : <Navigate to="/auth/login" />;
};

//Allow only not authed routes
const NotAuthWrapped = ({ isAuthed, children }: { isAuthed: boolean; children: any }) => {
  return !isAuthed ? <Wrapper>{children}</Wrapper> : <Navigate to="/" />;
};

const appRoutes = (isAuthed: boolean): RouteConfigs => {
  const routes: RouteConfigs = [
    {
      path: '/',
      element: (
        <AuthWrapped isAuthed={isAuthed}>
          <Dashboard />
        </AuthWrapped>
      ),
    },
    { path: '/auth', element: <Navigate to="/auth/login" /> },
    {
      path: '/auth/login',
      element: (
        <NotAuthWrapped isAuthed={isAuthed}>
          <LoginPage />
        </NotAuthWrapped>
      ),
    },
    {
      path: '/auth/register',
      element: (
        <NotAuthWrapped isAuthed={isAuthed}>
          <RegisterPage />
        </NotAuthWrapped>
      ),
    },
    {
      path: '/classroom/:id',
      element: (
        <AuthWrapped isAuthed={isAuthed}>
          <Classroom />
        </AuthWrapped>
      ),
    },
    {
      path: '*',
      element: <div>NOT FOUND</div>,
    },
  ];

  return routes;
};

export default appRoutes;
