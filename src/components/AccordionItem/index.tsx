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
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { accordionSx } from './style';
import { AccordionItemProps } from './type';

export const AccordionItem = ({ expanded, onClick }: AccordionItemProps) => {
  return (
    <Accordion elevation={0} sx={accordionSx.root} expanded={expanded} onChange={() => onClick()}>
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <Stack direction="row" gap={2} alignItems="center">
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <AssignmentOutlined />
          </Avatar>
          <Typography component="div" sx={accordionSx.summaryTitle}>
            {' '}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1} sx={{ ml: 'auto' }}>
          <Typography sx={accordionSx.time}>Test</Typography>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={(ev) => {
              ev.stopPropagation();
            }}
          >
            <MoreVert />
          </IconButton>
        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        <Typography sx={accordionSx.time}>Posted at Nov 12</Typography>

        <Grid container spacing={2} width="100%" sx={{ m: 0 }}>
          <Grid xs={9}>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
              leo lobortis eget.
            </Typography>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ ml: 1, mr: 2 }} />
          <Grid xs={2}>
            <Stack direction="column">
              <Typography variant="h4">10</Typography>
              <Typography variant="body2">Turned in</Typography>
            </Stack>
          </Grid>
        </Grid>
      </AccordionDetails>

      <AccordionActions>
        <Button>View Assignment</Button>
      </AccordionActions>
    </Accordion>
  );
};
