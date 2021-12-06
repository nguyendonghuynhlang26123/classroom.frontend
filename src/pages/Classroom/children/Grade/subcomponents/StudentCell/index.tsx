import { ListItemAvatar, Avatar, ListItemText, Typography, Stack } from '@mui/material';
import { IStudentInfo } from 'common/interfaces';
import { studentCellSx } from './style';
import React from 'react';

export const StudentInfoCell = ({ student }: { student: IStudentInfo }) => {
  return (
    <Stack direction="row" alignItems="center" sx={studentCellSx}>
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
    </Stack>
  );
};
