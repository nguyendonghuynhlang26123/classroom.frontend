import { Box, IconButton, LinearProgress, Link, Tab, Tabs, Typography } from '@mui/material';
import { ClassroomContextProvider, ConfirmDialog, Navbar, ProfileBtn, useAuth, useLoading } from 'components';
import React from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import {
  useGetClassDetailsQuery,
  useGetMyRoleQuery,
  useGetMyStudentIdQuery,
  useGetAllClassesQuery,
  useUpdateAccountSyncMutation,
} from 'services/api';
import { mainSx, navSx } from './style';
import { ClassroomSetting } from './subcomponents';
import { Outlet, useLocation } from 'react-router';
import { matchPath } from 'react-router-dom';
import Utils from 'common/utils';
import { toast } from 'react-toastify';
import { IClassroomBody, UserRole } from 'common/interfaces';

const getTabState = (pathName: string) => {
  if (matchPath('/classroom/:id/work', pathName)) return '1';
  if (matchPath('/classroom/:id/people', pathName)) return '2';
  if (matchPath('/classroom/:id/grade', pathName)) return '3';
  return '0';
};

const ClassroomBoard = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState<string>(getTabState(pathname));
  const [notifySyncing, showNotifySyncing] = React.useState<boolean>(false);
  const [notifyAddStudentId, showNotifyAddStudentId] = React.useState<boolean>(false);
  const [submitAccountSync, { isLoading: isSubmitingAccountSync }] = useUpdateAccountSyncMutation();

  const { data, error, isLoading: fetchingClassData } = useGetClassDetailsQuery(id as string);
  const { data: classrooms, isLoading: isFetchingClassrooms } = useGetAllClassesQuery();
  const { data: role, isLoading: fetchingRole } = useGetMyRoleQuery(id as string);
  const {
    data: studentData,
    error: stuErr,
    isLoading: fetchingStuId,
  } = useGetMyStudentIdQuery(
    {
      classId: id as string,
      userId: userData?._id as string,
    },
    { skip: !Boolean(role) || role !== UserRole.STUDENT },
  );

  const [loading, setLoading] = useLoading();

  //Error
  React.useEffect(() => {
    if (error) {
      toast.error('Not found this class');
      navigate('/not-found');
    }
  }, [error]);

  React.useEffect(() => {
    setLoading(Utils.isLoading(fetchingRole, fetchingClassData, fetchingStuId, isFetchingClassrooms));
  }, [fetchingClassData, fetchingRole, fetchingStuId, isFetchingClassrooms]);

  React.useEffect(() => {
    const err = stuErr as any;
    if (err && err?.status === 404) {
      showNotifySyncing(true);
    }
  }, [stuErr]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleAutomaticSync = () => {
    if (userData?.student_id == null) showNotifyAddStudentId(true);
    else
      submitAccountSync({
        class_id: id as string,
        body: {
          user_id: userData?._id as string,
          student_id: userData?.student_id as string,
        },
      })
        .unwrap()
        .then(() => {
          toast.success('Sync succeeded');
        })
        .catch((err) => {
          toast.error('Sync failed! Not found your student id in this class list! Please contact your teacher!');
        });
    showNotifySyncing(false);
  };

  return (
    <React.Fragment>
      <Navbar
        classrooms={classrooms || []}
        toolbarComponents={
          <>
            <Box sx={navSx.tabsContainer}>
              <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                <Tab value="0" label="Stream" id="stream" onClick={() => navigate('.')} />
                <Tab value="1" label="Classwork" id="work" onClick={() => navigate('./work')} />
                <Tab value="2" label="People" id="people" onClick={() => navigate('./people')} />
                {role !== UserRole.STUDENT && <Tab value="3" label="Grading" id="people" onClick={() => navigate('./grade')} />}
              </Tabs>
            </Box>
            {loading && <LinearProgress sx={navSx.progressBar} />}
          </>
        }
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link underline="hover" sx={navSx.link}>
            {data && data.title}
          </Link>
        </Typography>

        <Box>
          {role !== UserRole.STUDENT && <ClassroomSetting classData={data as IClassroomBody} />}
          {userData && <ProfileBtn fname={userData.first_name} imageUrl={userData.avatar} />}
        </Box>
      </Navbar>
      {data && role && (
        <Box sx={mainSx.container}>
          <ClassroomContextProvider role={role} classData={data} studentId={studentData ? studentData.student_id : null}>
            <Outlet />
          </ClassroomContextProvider>
        </Box>
      )}
      {role === UserRole.STUDENT && (
        <ConfirmDialog
          open={notifySyncing}
          handleClose={() => {
            showNotifySyncing(false);
          }}
          title="Syncin"
          description="You haven't sync your account with userId! Click 'Agree' to add your account to this classroom student list."
          onConfirm={handleAutomaticSync}
        />
      )}
      {role === UserRole.STUDENT && (
        <ConfirmDialog
          open={notifyAddStudentId}
          handleClose={() => {
            showNotifyAddStudentId(false);
          }}
          title="No student id found in your account setting!"
          description="You need to set up your student id in your profile setting first!"
          onConfirm={() => {
            showNotifyAddStudentId(false);
            navigate(`/profile`);
          }}
        />
      )}
    </React.Fragment>
  );
};

export default ClassroomBoard;
