import { Download, KeyboardReturn, Upload } from '@mui/icons-material';
import { Box, IconButton, Link, Stack, TableCell, Tooltip, Typography } from '@mui/material';
import Utils from 'common/utils';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AssignmentCellProps } from './type';

export const AssignmentCell = ({ data, onDownloadGrade, onUploadGrade, onDownloadTemplate, onFinalizeGrade }: AssignmentCellProps) => {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();
  return (
    <TableCell>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'end'}>
        <Box sx={{ width: '70%' }}>
          <Box className="time">{data.due_date ? `Due at ${Utils.displayDate(data.due_date)}` : 'No due date'}</Box>
          <Box onClick={() => navigate(`/classroom/${id}/work/details/${data._id}`)} className="assignment_title">
            {data.title}
          </Box>
        </Box>
        <IconButton onClick={onFinalizeGrade}>
          <Tooltip title="Mark grading as final">
            <KeyboardReturn fontSize="small" />
          </Tooltip>
        </IconButton>
      </Stack>
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
