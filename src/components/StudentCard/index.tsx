import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import Utils from 'common/utils';
import React from 'react';
import { StudentCardProps } from './type';
import { studentCardSx } from './style';

export const StudentCard = ({ data }: StudentCardProps) => {
  return (
    <Card sx={studentCardSx}>
      <CardMedia component="img" className="media" image={data.avatar} alt="User avatar" />
      <CardContent>
        <Typography className="name">{Utils.getFullName(data.first_name, data.last_name)}</Typography>
        <Typography className="email">💌 {data.email}</Typography>
        {data.student_id && <Typography className="id">🗝 {data.student_id}</Typography>}
      </CardContent>
    </Card>
  );
};
