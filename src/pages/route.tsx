import { RouteConfigs } from 'common/type';
import { Navigate } from 'react-router-dom';
import React from 'react';
import { LinearProgress } from '@mui/material';
import Utils from 'common/utils';

// main screen
const Dashboard = React.lazy(() => import('./Dashboard'));
//Auth
const LoginPage = React.lazy(() => import('./Auth/Login'));
const RegisterPage = React.lazy(() => import('./Auth/Register'));

const Classroom = React.lazy(() => import('./Classroom'));

const ProfilePage = React.lazy(() => import('./Profile'));

const InvitationPage = React.lazy(() => import('./InvitationPage'));

const NotFoundPage = React.lazy(() => import('./Errors/NotFound'));

// Public routes
const Wrapper = ({ children }: { children: any }) => (
  <React.Suspense fallback={<LinearProgress />}>{children}</React.Suspense>
);

// Authed routes
const AuthWrapped = ({ isAuthed, children, search = '' }: { isAuthed: boolean; children: any; search: string }) => {
  return isAuthed ? (
    <Wrapper>{children}</Wrapper>
  ) : (
    <Navigate to={'/auth/login?redirect=' + encodeURIComponent(window.location.pathname + window.location.search)} />
  );
};

//Allow only not authed routes
const NotAuthWrapped = ({ isAuthed, children, search = '' }: { isAuthed: boolean; children: any; search: string }) => {
  const link = Utils.getParameterByName('redirect', search); // Redirect if needed
  return !isAuthed ? <Wrapper>{children}</Wrapper> : <Navigate to={link ? link : '/'} />;
};

const appRoutes = (isAuthed: boolean, search: string): RouteConfigs => {
  const routes: RouteConfigs = [
    {
      path: '/',
      element: (
        <AuthWrapped isAuthed={isAuthed} search={search}>
          <Dashboard />
        </AuthWrapped>
      ),
    },
    {
      path: '/classroom/:id',
      element: (
        <AuthWrapped isAuthed={isAuthed} search={search}>
          <Classroom />
        </AuthWrapped>
      ),
    },
    {
      path: '/profile',
      element: (
        <AuthWrapped isAuthed={isAuthed} search={search}>
          <ProfilePage />
        </AuthWrapped>
      ),
    },
    {
      path: '/classes/join',
      element: (
        <AuthWrapped isAuthed={isAuthed} search={search}>
          <InvitationPage />
        </AuthWrapped>
      ),
    },
    { path: '/auth', element: <Navigate to="/auth/login" /> },
    {
      path: '/auth/login',
      element: (
        <NotAuthWrapped isAuthed={isAuthed} search={search}>
          <LoginPage />
        </NotAuthWrapped>
      ),
    },
    {
      path: '/auth/register',
      element: (
        <NotAuthWrapped isAuthed={isAuthed} search={search}>
          <RegisterPage />
        </NotAuthWrapped>
      ),
    },
    {
      path: '/not-found',
      element: (
        <Wrapper>
          <NotFoundPage />
        </Wrapper>
      ),
    },
    {
      path: '*',
      element: <Navigate to="/not-found" />,
    },
  ];

  return routes;
};

export default appRoutes;
