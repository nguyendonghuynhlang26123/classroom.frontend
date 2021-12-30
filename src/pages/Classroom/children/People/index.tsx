import { ContentCopy } from '@mui/icons-material';
import { Collapse, Container, Stack, Typography, Box, IconButton, Tooltip } from '@mui/material';
import { IClassroomUser, IStudentInfo, UserRole } from 'common/interfaces';
import Utils from 'common/utils';
import { useAuth, useClassroomCtx, useCopyToClipboard, useLoading } from 'components';
import React from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useGetAllStudentsQuery, useGetClassUsersQuery, useInviteUserMutation, useUpdateAccountSyncMutation } from 'services/api';
import { peopleTabSx } from './style';
import { InviteForm, PendingInvitation, Students, SyncForm, Teachers } from './subcomponents';

const ClassroomPeople = () => {
  const { id } = useParams<'id'>();
  const { role, classData, studentId } = useClassroomCtx();
  const { userData } = useAuth();
  const [copiedText, copy] = useCopyToClipboard();
  const { data: classUsers, isLoading: isFetchingUsers } = useGetClassUsersQuery(id as string);
  const { data: classStudents, error: fetchStuError, isLoading: isFetchingStudents } = useGetAllStudentsQuery(id as string);
  const [submitInvitation, { isLoading: isSubmitingInvitation }] = useInviteUserMutation();
  const [submitAccountSync, { isLoading: isSubmitingAccountSync }] = useUpdateAccountSyncMutation();

  const [inviteTeacher, showTeacherInviteForm] = React.useState<boolean>(false);
  const [inviteStudent, showStudentInviteForm] = React.useState<boolean>(false);
  const [syncTarget, setSyncTarget] = React.useState<IStudentInfo | null>(null);

  const [, setLoading] = useLoading();

  React.useEffect(() => {
    setLoading(Utils.isLoading(isFetchingStudents, isFetchingUsers, isSubmitingInvitation, isSubmitingAccountSync));
  }, [isFetchingUsers, isFetchingStudents, isSubmitingInvitation, isSubmitingAccountSync]);

  const getTeachers = (data: IClassroomUser[] | undefined) =>
    data && data.length > 0 ? data.filter((u: IClassroomUser) => u.role !== UserRole.STUDENT && u.status !== 'INACTIVATED') : [];

  const getPendingInvititaion = (data: IClassroomUser[] | undefined) =>
    data && data.length > 0 ? data.filter((u: IClassroomUser) => u.status !== 'ACTIVATED') : [];

  const getNotSyncedStudents = (data: IClassroomUser[] | undefined) => {
    if (!data || data.length === 0) return [];
    if (!classStudents) return [];
    const syncedStudents = classStudents.students.filter((s) => s.status === 'SYNCED').map((s) => s.user_id?._id);
    return data.filter(
      (u: IClassroomUser) => u.role === UserRole.STUDENT && u.status !== 'INACTIVATED' && !syncedStudents.find((s) => s === u.user_id._id),
    );
  };

  const syncBtnCallback = (s: IStudentInfo) => {
    if (!s || !userData) return;
    if (role !== UserRole.STUDENT) setSyncTarget(s);
  };

  const submitInvite = (invitedRole: UserRole, email: string) => {
    submitInvitation({
      class_id: id as string,
      role: invitedRole,
      email: email,
    })
      .unwrap()
      .then(() => {
        toast.success('Email submited!');
      })
      .catch((err) => {
        if (err.status === 409) toast.warn('This user has been added to this class');
      });
  };

  const submitUpdateSync = (studentId: string, userId: string) => {
    submitAccountSync({
      class_id: id as string,
      body: {
        user_id: userId,
        student_id: studentId,
      },
    })
      .unwrap()
      .then(() => {
        toast.success('Operation succeeded');
      })
      .catch((err) => {
        toast.error('Operation failed! ' + err.data);
      });
    setSyncTarget(null);
  };

  return (
    <Collapse timeout={500} appear={true} in={true}>
      <Container maxWidth="md" sx={peopleTabSx.root}>
        <Teachers role={role} onInvite={() => showTeacherInviteForm(true)} data={getTeachers(classUsers)} />

        <Students
          studentId={studentId}
          role={role}
          data={fetchStuError ? [] : classStudents?.students}
          onInvite={() => showStudentInviteForm(true)}
          onBtnSyncClick={syncBtnCallback}
        />
        <PendingInvitation role={role} data={getPendingInvititaion(classUsers)} />

        <InviteForm
          title="Invite Teachers"
          open={inviteTeacher}
          description={
            <Typography variant="body2" gutterBottom component="p">
              Send an invitation link to your colleagues via email and invite them as a collaborative teacher.
            </Typography>
          }
          handleClose={() => showTeacherInviteForm(false)}
          onSubmit={(email: string) => {
            submitInvite(UserRole.TEACHER, email);
            showTeacherInviteForm(false);
          }}
        />

        <InviteForm
          title="Invite students"
          open={inviteStudent}
          description={
            <React.Fragment>
              <Typography variant="body2" gutterBottom component="p">
                Send an invitation link to your students via email.
              </Typography>
              <Stack direction="row" sx={peopleTabSx.invite}>
                <Box>
                  <Typography variant="body2" component="p">
                    Or use this <b>Invitation link</b>
                  </Typography>
                  <Box component="div" className="link">
                    {Utils.getInvitationLinkFormat(id as string, classData?.code || '')}
                  </Box>
                </Box>
                <Tooltip title={copiedText ? 'Copied' : 'Copy invitation link'}>
                  <IconButton onClick={() => copy(Utils.getInvitationLinkFormat(id as string, classData?.code || ''))}>
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
              </Stack>
            </React.Fragment>
          }
          handleClose={() => showStudentInviteForm(false)}
          onSubmit={(email: string) => {
            submitInvite(UserRole.STUDENT, email);
            showStudentInviteForm(false);
          }}
        />

        {syncTarget !== null && (
          <SyncForm
            open={syncTarget !== null}
            selectedId={syncTarget?.user_id?._id}
            students={getNotSyncedStudents(classUsers)}
            handleClose={() => setSyncTarget(null)}
            onSubmit={(id: string) => {
              // console.log(`Map student id = ${syncTarget?.student_id} -> user #${id} `);
              if (syncTarget) submitUpdateSync(syncTarget?.student_id, id);
            }}
          />
        )}
      </Container>
    </Collapse>
  );
};

export default ClassroomPeople;
