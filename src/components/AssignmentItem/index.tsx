import { AssignmentOutlined, MoreVert } from '@mui/icons-material';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import Utils from 'common/utils';
import React from 'react';
import { accordionSx } from './style';
import { AccordionItemProps } from './type';

export const AssignmentItem = ({ data, expanded, onClick, actionBtns, colorMode, mark }: AccordionItemProps) => {
  const isExpired = () => {
    if (data.due_date === null || Date.now() <= data.due_date) return false;
    return true;
  };

  return (
    <Accordion elevation={0} sx={accordionSx.root} expanded={expanded} onChange={onClick}>
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <Stack direction="row" gap={2} alignItems="center">
          <Avatar sx={{ bgcolor: isExpired() ? 'grey.500' : colorMode + '.main' }}>
            <AssignmentOutlined />
          </Avatar>
          <Typography component="div" sx={accordionSx.summaryTitle}>
            {data.title}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1} sx={{ ml: 'auto' }}>
          <Typography sx={accordionSx.time}>
            <b> {mark !== undefined && `Graded: ${mark}/${data.total_points}`} </b>
            <br />
            {data.due_date ? 'Due at ' + Utils.displayDate(data.due_date) : 'No due date'}
          </Typography>
        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        <Typography sx={accordionSx.time}>Post at {Utils.displayDate(data.created_at as number)}</Typography>

        {mark !== undefined ? (
          <Grid container spacing={2} width="100%" sx={{ m: 0 }}>
            <Grid item xs={9}>
              <div dangerouslySetInnerHTML={{ __html: data.instructions }} />
            </Grid>
            <Divider orientation="vertical" flexItem sx={{ ml: 1, mr: 2 }} />
            <Grid item xs={2} alignItems="end" display="flex">
              <Stack direction="column">
                <Typography variant="h4">{mark}</Typography>
                <Typography variant="body2">Your grade</Typography>
              </Stack>
            </Grid>
          </Grid>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: data.instructions }} />
        )}
      </AccordionDetails>

      <AccordionActions>
        {actionBtns.map((btn: JSX.Element, key) => {
          return <React.Fragment key={key}>{btn}</React.Fragment>;
        })}
      </AccordionActions>
    </Accordion>
  );
};
