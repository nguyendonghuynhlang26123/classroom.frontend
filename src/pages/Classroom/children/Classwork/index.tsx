import { Add } from '@mui/icons-material';
import { Button, Collapse, Grid, List, ListItemButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { IAssignment } from 'common/interfaces';
import { useClassroomCtx, AssignmentItem } from 'components';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetAssignmentsQuery } from 'services';
import { classworkSx } from './style';

const ClassroomWork = () => {
  const { role } = useClassroomCtx();
  const { id } = useParams<'id'>();
  const { data, isLoading } = useGetAssignmentsQuery(id as string);
  console.log('log ~ file: index.tsx ~ line 15 ~ ClassroomWork ~ data', data);
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
            {/* {['', 'Students'].map((t: any) => (
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
            ))} */}
            {!isLoading && data ? (
              data.map((a: IAssignment, idx: number) => (
                <React.Fragment key={idx}>
                  <AssignmentItem
                    data={a}
                    expanded={expandItemKey === a._id}
                    onClick={() => toggleExpand(expandItemKey, a._id || '')}
                    onEdit={() => navigate(`/classroom/${id}/work/edit/${a._id}`)}
                    onRemove={() => {}}
                  />
                </React.Fragment>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </Box>
        </Grid>
      </Grid>
    </Collapse>
  );
};

export default ClassroomWork;
