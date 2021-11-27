import { Add, Close, DragIndicatorSharp, MoreHorizRounded, RestartAlt, Save } from '@mui/icons-material';
import {
  Button,
  Collapse,
  Container,
  Divider,
  Grid,
  LinearProgress,
  MenuItem,
  Menu,
  Stack,
  Tooltip,
  IconButton,
  Typography,
  Slide,
  Paper,
} from '@mui/material';
import { Box } from '@mui/system';
import { IAssignment, UserRole } from 'common/interfaces';
import Utils from 'common/utils';
import { AssignmentItem, ConfirmDialog, useClassroomCtx } from 'components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetAssignmentsQuery, useRemoveAssignmentMutation } from 'services';
import { gradeStructureSx } from './style';
import { toast } from 'react-toastify';

export const EditableGradeStructure = () => {
  const { id } = useParams<'id'>();
  const containerRef = React.useRef(null);
  const { data, isLoading } = useGetAssignmentsQuery(id as string);
  const [removeAssignment, { isLoading: isRemoving }] = useRemoveAssignmentMutation();
  const navigate = useNavigate();
  const [expandItemKey, setExpandKey] = React.useState<string | null>(null);
  const [removingId, setRemovingId] = React.useState<string | null>(null);
  const [sortMode, setSortMode] = React.useState<boolean>(false);

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

  const handleDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    setSortMode(true);
  };

  const handleCreateAssignment = () => {
    navigate(`/classroom/${id}/work/create`);
  };

  return (
    <React.Fragment>
      <Container maxWidth="md" sx={gradeStructureSx.form} ref={containerRef}>
        {!sortMode && (
          <Slide direction="left" in={!sortMode} container={containerRef.current}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography sx={gradeStructureSx.formHeader} color="primary">
                Grading Structure{' '}
              </Typography>

              <Button endIcon={<Add />} variant="outlined" color="primary" onClick={handleCreateAssignment}>
                Add an assignment
              </Button>
            </Stack>
          </Slide>
        )}
        {sortMode && (
          <Slide direction="right" in={sortMode} container={containerRef.current}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography sx={gradeStructureSx.formHeader} color="secondary">
                Reorder assignments
              </Typography>

              <Stack direction="row" spacing={1}>
                <Tooltip title="Reset ordering">
                  <IconButton color="secondary">
                    <RestartAlt />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Exit re-ordering">
                  <IconButton color="secondary" onClick={() => setSortMode(false)}>
                    <Close />
                  </IconButton>
                </Tooltip>
                <Button endIcon={<Save />} variant="contained" color="secondary">
                  Save
                </Button>
              </Stack>
            </Stack>
          </Slide>
        )}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={'criteria'}>
            {(provided) => (
              <Box
                component="div"
                sx={gradeStructureSx.cardContainer}
                bgcolor={sortMode ? 'grey.100' : 'white'}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {data &&
                  data.map((a: IAssignment, indx: number) => (
                    <Draggable draggableId={'row-' + indx} index={indx} key={indx}>
                      {(dragProvided) => (
                        <div
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          ref={dragProvided.innerRef}
                        >
                          <React.Fragment key={a._id}>
                            <Box sx={gradeStructureSx.criteriaCard} width="100%">
                              <Box sx={gradeStructureSx.dragZone}>
                                <Tooltip title="Drag to reorder">
                                  <DragIndicatorSharp className="dragIcon" />
                                </Tooltip>
                                <IconButton size="small" onClick={() => {}}>
                                  <MoreHorizRounded />
                                </IconButton>
                              </Box>
                              <AssignmentItem
                                data={a}
                                colorMode={sortMode ? 'secondary' : 'primary'}
                                expanded={expandItemKey === a._id}
                                onClick={() => toggleExpand(expandItemKey, a._id || '')}
                                actionBtns={[
                                  <Button color="primary">View assignment</Button>,
                                  <Button color="secondary">Edit assignment</Button>,
                                ]}
                              />
                            </Box>
                          </React.Fragment>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Container>

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
    </React.Fragment>
  );
};
