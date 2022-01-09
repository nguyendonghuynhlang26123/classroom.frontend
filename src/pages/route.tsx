import { RouteConfigs } from 'common/type';
import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import Utils from 'common/utils';
import { LinearProgress, Skeleton } from '@mui/material';

// main screen
const Dashboard = React.lazy(() => import('./Dashboard'));

//Auth
const LoginPage = React.lazy(() => import('./Auth/Login'));
const RegisterPage = React.lazy(() => import('./Auth/Register'));
const ResetPassword = React.lazy(() => import('./Auth/ResetPassword'));

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

//Other
const ProfilePage = React.lazy(() => import('./Profile'));
const InvitationPage = React.lazy(() => import('./InvitationPage'));
const MailActivation = React.lazy(() => import('./EmailActivate'));
const BannedPage = React.lazy(() => import('./Banned'));

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
              element: (
                <Wrapper>
                  <ClassroomStream />
                </Wrapper>
              ),
            },
            {
              path: 'people',
              element: (
                <Wrapper>
                  <ClassroomPeople />
                </Wrapper>
              ),
            },
            {
              path: 'grade',
              element: (
                <Wrapper>
                  <ClassroomGrading />
                </Wrapper>
              ),
            },
            {
              path: 'work',
              children: [
                {
                  index: true,
                  element: (
                    <Wrapper>
                      <ClassroomWork />
                    </Wrapper>
                  ),
                },
                {
                  path: 'create',
                  element: (
                    <Wrapper>
                      <AssignmentCreate />
                    </Wrapper>
                  ),
                },
                {
                  path: 'edit/:assignmentId',
                  element: (
                    <Wrapper>
                      <AssignmentEdit />
                    </Wrapper>
                  ),
                },
                {
                  path: 'details/:assignmentId',
                  element: (
                    <Wrapper>
                      <AssignmentDetails />
                    </Wrapper>
                  ),
                },
              ],
            },
            {
              path: 'grade-reviews',
              element: (
                <Wrapper>
                  <GradeReviews />
                </Wrapper>
              ),
              children: [
                {
                  index: true,
                  element: <div />,
                },
                {
                  path: ':reviewId',
                  element: (
                    <Wrapper>
                      <ReviewPanel />
                    </Wrapper>
                  ),
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
        {
          path: '/auth/reset',
          element: <ResetPassword />,
        },
        {
          path: '/mail-activate',
          element: <MailActivation />,
        },
        {
          path: '/account-banned',
          element: <BannedPage />,
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
