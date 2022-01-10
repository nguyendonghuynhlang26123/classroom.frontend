import { TableCell, Typography } from '@mui/material';
import React from 'react';
import { TotalCellPropsType } from './type';

export const TotalGradeCell = ({ gradeArray, total }: TotalCellPropsType) => {
  const getTotalPoint = () => {
    if (gradeArray && gradeArray.length > 0) {
      let totalPoint = 0;
      for (let grade of gradeArray) totalPoint = grade !== -1 ? totalPoint + grade : totalPoint;
      return totalPoint;
    }
    return 0;
  };

  return (
    <TableCell className="total-collumn">
      <Typography variant="body1">{getTotalPoint()}</Typography>
      <Typography variant="body2">/{total}</Typography>
    </TableCell>
  );
};
