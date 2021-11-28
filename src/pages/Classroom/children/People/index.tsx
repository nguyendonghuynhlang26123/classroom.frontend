import { ContentCopy } from '@mui/icons-material';
import { Collapse, Container, Stack, Typography, Box, IconButton, Tooltip } from '@mui/material';
import { IClassroomUser, UserRole } from 'common/interfaces';
import Utils from 'common/utils';
import { useClassroomCtx, useCopyToClipboard } from 'components';
import React from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useGetAllStudentsQuery, useGetClassUsersQuery, useInviteUserMutation } from 'services/api';
import { peopleTabSx } from './style';
import { InviteForm, PendingInvitation, Students, Teachers } from './subcomponents';

const ClassroomPeople = () => {
  const { id } = useParams<'id'>();
  const { role, classData } = useClassroomCtx();
  const [copiedText, copy] = useCopyToClipboard();
  const [inviteTeacher, showTeacherInviteForm] = React.useState<boolean>(false);
  const [inviteStudent, showStudentInviteForm] = React.useState<boolean>(false);
  const { data: classUsers, isLoading } = useGetClassUsersQuery(id as string);
  const { data: classStudents, isLoading: isFetchingStudents } = useGetAllStudentsQuery(id as string);
  const [submitInvitation] = useInviteUserMutation();

  const getTeachers = (data: IClassroomUser[] | undefined) =>
    data && data.length > 0
      ? data.filter((u: IClassroomUser) => u.role !== UserRole.STUDENT && u.status !== 'INACTIVATED')
      : [];

  const getPendingInvititaion = (data: IClassroomUser[] | undefined) =>
    data && data.length > 0 ? data.filter((u: IClassroomUser) => u.status !== 'ACTIVATED') : [];

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

  return (
    <Collapse timeout={500} appear={true} in={true}>
      <Container maxWidth="md" sx={peopleTabSx.root}>
        <Teachers role={role} onInvite={() => showTeacherInviteForm(true)} data={getTeachers(classUsers)} />

        <Students role={role} data={classStudents?.students} onInvite={() => showStudentInviteForm(true)} />
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
      </Container>
    </Collapse>
  );
};

export default ClassroomPeople;
