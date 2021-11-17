import { RouteConfigs } from 'common/type';
import { Navigate } from 'react-router-dom';
import React from 'react';
import { LinearProgress } from '@mui/material';
import Utils from 'common/utils';
import Dashboard from './Dashboard';
import LoginPage from './Auth/Login';
import RegisterPage from './Auth/Register';
import Classroom from './Classroom';
import ProfilePage from './Profile';
import NotFoundPage from './Errors/NotFound';
import InvitationPage from './InvitationPage';

// main screen
// const Dashboard = React.lazy(() => import('./Dashboard'));
// //Auth
// const LoginPage = React.lazy(() => import('./Auth/Login'));
// const RegisterPage = React.lazy(() => import('./Auth/Register'));

// const Classroom = React.lazy(() => import('./Classroom'));

// const ProfilePage = React.lazy(() => import('./Profile'));

// const InvitationPage = React.lazy(() => import('./InvitationPage'));

// const NotFoundPage = React.lazy(() => import('./Errors/NotFound'));

// Public routes
const Wrapper = ({ children }: { children: any }) => <React.Fragment>{children}</React.Fragment>;

// Authed routes
const AuthWrapped = ({
  isAuthed,
  children,
  search = '',
  pathname = '',
}: {
  isAuthed: boolean;
  children: any;
  search: string;
  pathname: string;
}) => {
  return isAuthed ? (
    <Wrapper>{children}</Wrapper>
  ) : (
    <Navigate to={'/auth/login?redirect=' + encodeURIComponent(pathname + search)} />
  );
};

//Allow only not authed routes
const NotAuthWrapped = ({ isAuthed, children, search = '' }: { isAuthed: boolean; children: any; search: string }) => {
  const link = Utils.getParameterByName('redirect', search); // Redirect if needed
  return !isAuthed ? <Wrapper>{children}</Wrapper> : <Navigate to={link ? link : '/'} />;
};

const appRoutes = (isAuthed: boolean, search: string, pathname: string): RouteConfigs => {
  const routes: RouteConfigs = [
    {
      path: '/',
      element: (
        <AuthWrapped isAuthed={isAuthed} search={search} pathname={pathname}>
          <Dashboard />
        </AuthWrapped>
      ),
    },
    {
      path: '/classroom/:id',
      element: (
        <AuthWrapped isAuthed={isAuthed} search={search} pathname={pathname}>
          <Classroom />
        </AuthWrapped>
      ),
    },
    {
      path: '/profile',
      element: (
        <AuthWrapped isAuthed={isAuthed} search={search} pathname={pathname}>
          <ProfilePage />
        </AuthWrapped>
      ),
    },
    {
      path: '/classes/join',
      element: (
        <AuthWrapped isAuthed={isAuthed} search={search} pathname={pathname}>
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
      path: '/*',
      element: <Navigate to="/not-found" />,
    },
  ];

  return routes;
};

export default appRoutes;
