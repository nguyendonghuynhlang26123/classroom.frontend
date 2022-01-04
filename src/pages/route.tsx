import { RouteConfigs } from 'common/type';
import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
// import { LinearProgress } from '@mui/material';
import Utils from 'common/utils';
import { LinearProgress } from '@mui/material';
// import Dashboard from './Dashboard';
// import LoginPage from './Auth/Login';
// import RegisterPage from './Auth/Register';
// import Classroom from './Classroom';
// import ProfilePage from './Profile';
// import NotFoundPage from './Errors/NotFound';
// import InvitationPage from './InvitationPage';

// main screen
const Dashboard = React.lazy(() => import('./Dashboard'));

//Auth
const LoginPage = React.lazy(() => import('./Auth/Login'));
const RegisterPage = React.lazy(() => import('./Auth/Register'));

//Classroom
const Classroom = React.lazy(() => import('./Classroom'));
const ClassroomPeople = React.lazy(() => import('./Classroom/children/People'));
const ClassroomStream = React.lazy(() => import('./Classroom/children/Stream'));
const ClassroomWork = React.lazy(() => import('./Classroom/children/Classwork'));
const ClassroomGrading = React.lazy(() => import('./Classroom/children/Grade'));
const GradeReviews = React.lazy(() => import('./Classroom/children/GradeReview'));

const ReviewPanel = React.lazy(() => import('./Classroom/children/GradeReview/children/ReviewPanel'));
const AssignmentCreate = React.lazy(() => import('./Classroom/children/Classwork/children/AssignmentCreation'));
const AssignmentEdit = React.lazy(() => import('./Classroom/children/Classwork/children/AssignmentEdit'));
const AssignmentDetails = React.lazy(() => import('./Classroom/children/Classwork/children/AssignmentDetails'));

const ProfilePage = React.lazy(() => import('./Profile'));

const InvitationPage = React.lazy(() => import('./InvitationPage'));

//Error pages
const NotFoundPage = React.lazy(() => import('./Errors/NotFound'));

// Public routes
const Wrapper = ({ children }: { children: any }) => <React.Suspense fallback={<LinearProgress />}>{children}</React.Suspense>;

// Authed routes
const AuthWrapped = ({ isAuthed, search = '', pathname = '' }: { isAuthed: boolean; search: string; pathname: string }) => {
  if (pathname === '/') {
    pathname = '';
    search = '';
  }
  return isAuthed ? (
    <Wrapper>
      <Outlet />
    </Wrapper>
  ) : (
    <Navigate to={'/auth/login?redirect=' + encodeURIComponent(pathname + search)} />
  );
};

//Allow only not authed routes
const NotAuthWrapped = ({ isAuthed, search = '' }: { isAuthed: boolean; search: string }) => {
  const link = Utils.getParameterByName('redirect', search); // Redirect if needed
  return !isAuthed ? (
    <Wrapper>
      <Outlet />
    </Wrapper>
  ) : (
    <Navigate to={link ? link : '/'} />
  );
};

const appRoutes = (isAuthed: boolean, search: string, pathname: string): RouteConfigs => {
  const routes: RouteConfigs = [
    /// Authed routes
    {
      element: <AuthWrapped isAuthed={isAuthed} search={search} pathname={pathname} />, //Wrap by auth checking
      children: [
        {
          path: '/',
          index: true,
          element: <Dashboard />,
        },
        {
          path: '/classroom/:id',
          element: <Classroom />,
          children: [
            {
              index: true,
              element: <ClassroomStream />,
            },
            {
              path: 'people',
              element: <ClassroomPeople />,
            },
            {
              path: 'grade',
              element: <ClassroomGrading />,
            },
            {
              path: 'work',
              children: [
                {
                  index: true,
                  element: <ClassroomWork />,
                },
                {
                  path: 'create',
                  element: <AssignmentCreate />,
                },
                {
                  path: 'edit/:assignmentId',
                  element: <AssignmentEdit />,
                },
                {
                  path: 'details/:assignmentId',
                  element: <AssignmentDetails />,
                },
              ],
            },
            {
              path: 'grade-reviews',
              element: <GradeReviews />,
              children: [
                {
                  index: true,
                  element: <div />,
                },
                {
                  path: ':reviewId',
                  element: <ReviewPanel />,
                },
              ],
            },
          ],
        },
        {
          path: '/profile',
          element: <ProfilePage />,
        },
        {
          path: '/classes/join',
          element: <InvitationPage />,
        },
      ],
    },

    //Auth routes
    { path: '/auth', element: <Navigate to="/auth/login" /> },
    {
      element: <NotAuthWrapped isAuthed={isAuthed} search={search} />, //Wrap by no auth checking
      children: [
        {
          path: '/auth/login',
          element: <LoginPage />,
        },
        {
          path: '/auth/register',
          element: <RegisterPage />,
        },
      ],
    },

    //Error handler
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
