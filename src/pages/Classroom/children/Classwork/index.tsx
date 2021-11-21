import { Add } from '@mui/icons-material';
import { Button, Collapse, Grid, List, ListItemButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useClassroomCtx, AccordionItem } from 'components';
import React from 'react';
import { useNavigate } from 'react-router';
import { classworkSx } from './style';

const ClassroomWork = () => {
  const { role } = useClassroomCtx();
  const navigate = useNavigate();
  const [expandItemKey, setExpandKey] = React.useState<string | null>(null);

  const toggleExpand = (curExpandKey: string | null, key: string) => {
    if (curExpandKey === key) setExpandKey(null);
    else setExpandKey(key);
  };

  return (
    <Collapse timeout={500} appear={true} in={true}>
      <Stack justifyContent="flex-end">
        <Button startIcon={<Add />} sx={classworkSx.addBtn} variant="outlined" onClick={() => navigate('./create')}>
          Create
        </Button>
      </Stack>
      <Grid container spacing={2} sx={classworkSx.root}>
        <Grid item xs={3}>
          <List sx={classworkSx.topicsList}>
            <ListItemButton selected>All topic</ListItemButton>
            <ListItemButton>Test</ListItemButton>
          </List>
        </Grid>
        <Grid item xs={9}>
          <Box>
            {['', 'Students'].map((t: any) => (
              <React.Fragment key={t}>
                {t !== '' && (
                  <Stack direction="row" justifyContent="space-between" sx={classworkSx.header}>
                    <Typography>{t}</Typography>
                  </Stack>
                )}
                {[1, 2, 3].map((u: any, idx: number) => (
                  <React.Fragment key={idx}>
                    <AccordionItem
                      expanded={expandItemKey === t + idx}
                      onClick={() => toggleExpand(expandItemKey, t + idx)}
                    />
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Collapse>
  );
};

export default ClassroomWork;
