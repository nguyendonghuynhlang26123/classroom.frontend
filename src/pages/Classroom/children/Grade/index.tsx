import { Upload } from '@mui/icons-material';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Collapse,
  Box,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Stack,
  IconButton,
} from '@mui/material';
import { IAssignment, IStudentInfo } from 'common/interfaces';
import Utils from 'common/utils';
import { useLoading } from 'components';
import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useGetAssignmentsQuery, useGetAllStudentsQuery } from 'services';
import { gradeSx } from './style';

const UserInfo = ({ student }: { student: IStudentInfo }) => (
  <ListItem alignItems="center" sx={gradeSx.userInfo}>
    <ListItemAvatar>
      {student.user_id ? (
        <Avatar alt={student.user_id.first_name} src={student.user_id.avatar} sx={{ bgcolor: 'primary.main' }} />
      ) : (
        <Avatar />
      )}
    </ListItemAvatar>
    <ListItemText
      primary={student.student_name}
      secondary={
        <>
          <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
            {student.student_id}
          </Typography>
          {student.status === 'SYNCED' &&
            student.user_id &&
            ` - ${student.user_id.first_name + ' ' + student.user_id.last_name} (${student.user_id.email})`}
        </>
      }
    />
  </ListItem>
);

const Grading = () => {
  const navigate = useNavigate();
  const { id } = useParams<'id'>();
  const { data: assignments, isLoading: isFetchingAssignments } = useGetAssignmentsQuery(id as string);
  const { data: classStudents, isLoading: isFetchingStudents } = useGetAllStudentsQuery(id as string);
  const students = classStudents?.students;
  const [, setLoading] = useLoading();

  React.useEffect(() => {
    setLoading(Utils.isLoading(isFetchingAssignments, isFetchingStudents));
  }, [isFetchingAssignments, isFetchingStudents]);
  return (
    <Collapse timeout={500} appear={true} in={true}>
      <Box sx={{ position: 'relative' }}>
        <TableContainer sx={gradeSx.root}>
          <Table aria-label="simple table" sx={gradeSx.table} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="fixed-collumn fixed-header" sx={gradeSx.controller}>
                  <ListItem>
                    <Stack direction="row">
                      <IconButton>
                        <Upload />
                      </IconButton>
                      <IconButton>
                        <Upload />
                      </IconButton>
                    </Stack>
                  </ListItem>
                </TableCell>

                {assignments?.map((a: IAssignment, indx: number) => (
                  <TableCell key={indx}>
                    <Box className="time">{a.due_date ? `Due at ${Utils.displayDate(a.due_date)}` : 'No due date'}</Box>
                    <Box
                      onClick={() => navigate(`/classroom/${id}/work/details/${a._id}`)}
                      className="assignment_title"
                    >
                      {a.title}
                    </Box>
                    <Box className="header_point">out of {a.total_points}</Box>
                  </TableCell>
                ))}

                <TableCell className="placeholder"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students &&
                students.map((s: IStudentInfo, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="fixed-collumn">
                      <UserInfo student={s} />
                    </TableCell>
                    {assignments?.map((a: IAssignment, indx: number) => (
                      <TableCell key={indx}></TableCell>
                    ))}
                    <TableCell className="placeholder"></TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Collapse>
  );
};

export default Grading;
