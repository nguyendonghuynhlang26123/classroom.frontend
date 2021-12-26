import React from 'react';
import { TableCell, Box, Stack, Tooltip, Typography, Link } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { AssignmentCellProps } from './type';
import { Download, Upload } from '@mui/icons-material';
import Utils from 'common/utils';

export const AssignmentCell = ({ data, onDownloadGrade, onUploadGrade, onDownloadTemplate }: AssignmentCellProps) => {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();
  return (
    <TableCell>
      <Box className="time">{data.due_date ? `Due at ${Utils.displayDate(data.due_date)}` : 'No due date'}</Box>
      <Box onClick={() => navigate(`/classroom/${id}/work/details/${data._id}`)} className="assignment_title">
        {data.title}
      </Box>
      <Stack direction="row" className="header_point" justifyContent="space-between">
        <Box>out of {data.total_points}</Box>
        <Stack direction="row" spacing={1}>
          <Tooltip
            arrow
            title={
              <Typography id="tooltip-text" sx={{ fontSize: 12 }}>
                Upload grade sheet{' '}
                <Link
                  href="#"
                  sx={{ fontSize: 12, color: 'yellow' }}
                  onClick={(ev) => {
                    ev.preventDefault();
                    onDownloadTemplate();
                  }}
                >
                  Download template here
                </Link>
              </Typography>
            }
          >
            <Upload className="icon" onClick={onUploadGrade} />
          </Tooltip>
          <Tooltip title="Dowload grade sheet" onClick={onDownloadGrade}>
            <Download className="icon" />
          </Tooltip>
        </Stack>
      </Stack>
    </TableCell>
  );
};
