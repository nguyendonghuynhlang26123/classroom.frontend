import { Add } from '@mui/icons-material';
import {
  Button,
  Collapse,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { IAssignment, IAssignmentTopic, UserRole } from 'common/interfaces';
import Utils from 'common/utils';
import { AssignmentItem, ConfirmDialog, useClassroomCtx } from 'components';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetAllTopicsQuery, useGetAssignmentsQuery, useRemoveAssignmentMutation } from 'services';
import { classworkSx } from './style';
import { toast } from 'react-toastify';

type OrganizedAssignments = IAssignment[][];

const organizingAssignment = (
  assignments: IAssignment[] | undefined,
  topics: IAssignmentTopic[] | undefined,
): OrganizedAssignments => {
  if (!assignments || !topics) return [];
  let result: OrganizedAssignments = [];
  result.push(assignments.filter((a) => a.topic === null));
  result = [...result, ...topics.map((t) => assignments.filter((a: IAssignment) => a.topic === t._id))];
  return result.filter((arr) => arr.length > 0);
};

const ClassroomWork = () => {
  const { role } = useClassroomCtx();
  const { id } = useParams<'id'>();
  const { data, isLoading } = useGetAssignmentsQuery(id as string);
  const { data: topics, isLoading: isFetchingTopic } = useGetAllTopicsQuery(id as string);
  const [removeAssignment, { isLoading: isRemoving }] = useRemoveAssignmentMutation();
  const navigate = useNavigate();
  const [expandItemKey, setExpandKey] = React.useState<string | null>(null);
  const [removingId, setRemovingId] = React.useState<string | null>(null);
  const organizedAssignments = organizingAssignment(data, topics);

  const toggleExpand = (curExpandKey: string | null, key: string) => {
    if (curExpandKey === key) setExpandKey(null);
    else setExpandKey(key);
  };

  const handleRemoveAssignment = (assignmentId: string) => {
    removeAssignment({ id: id as string, assignmentId: assignmentId })
      .unwrap()
      .then(() => {
        toast.success('Operation succeed');
      })
      .catch((err) => {
        toast.error('Cannot remove assignment! ' + err.data);
      });
  };

  return (
    <Collapse timeout={500} appear={true} in={true}>
      {Utils.isLoading(isLoading, isRemoving, isFetchingTopic) && <LinearProgress sx={{ mt: -4, mx: -100 }} />}
      {role !== UserRole.STUDENT && (
        <>
          <Stack justifyContent="flex-end">
            <Button startIcon={<Add />} sx={classworkSx.addBtn} variant="outlined" onClick={() => navigate('./create')}>
              Create
            </Button>
            <Divider sx={{ mb: 2.5 }} />
          </Stack>
        </>
      )}
      <Grid container spacing={2} sx={classworkSx.root}>
        <Grid item xs={3} sx={classworkSx.topicContainer}>
          {topics && topics.length > 0 && (
            <List sx={classworkSx.topicsList}>
              <ListItemButton selected>All topic</ListItemButton>
              {topics.map((t: IAssignmentTopic, i) => (
                <ListItemButton key={t._id}>{t.title}</ListItemButton>
              ))}
            </List>
          )}
        </Grid>
        <Grid item xs={9}>
          <Box>
            {topics &&
              organizedAssignments &&
              organizedAssignments.length > 0 &&
              organizedAssignments.map((arr: IAssignment[], i: number) => (
                <React.Fragment key={i}>
                  {i !== 0 && (
                    <>
                      <Stack direction="row" justifyContent="space-between" sx={classworkSx.header}>
                        <Typography>{topics[i - 1].title}</Typography>
                      </Stack>
                      <Divider sx={{ my: 1, bgcolor: 'primary.main' }} orientation="horizontal" />
                    </>
                  )}
                  {arr.map((a: IAssignment, idx: number) => (
                    <React.Fragment key={a._id}>
                      <AssignmentItem
                        data={a}
                        expanded={expandItemKey === a._id}
                        onClick={() => toggleExpand(expandItemKey, a._id || '')}
                        onEdit={() => navigate(`/classroom/${id}/work/edit/${a._id}`)}
                        onView={() => navigate(`/classroom/${id}/work/details/${a._id}`)}
                        onRemove={() => {
                          setRemovingId(a._id as string);
                        }}
                      />
                      {arr.length > idx + 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
          </Box>
        </Grid>
      </Grid>

      <ConfirmDialog
        open={removingId !== null}
        handleClose={() => setRemovingId(null)}
        title={'Deletion alert'}
        description={'Remove this assignment? Note that you cannot revert this process!'}
        onConfirm={() => {
          handleRemoveAssignment(removingId as string);
          setRemovingId(null);
        }}
      />
    </Collapse>
  );
};

export default ClassroomWork;
