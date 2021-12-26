import { Add, Close, DragIndicatorSharp, MoreHorizRounded, RestartAlt, Save } from '@mui/icons-material';
import {
  Button,
  Collapse,
  Container,
  Divider,
  Link as ALink,
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
import { IAssignment, IAssignmentBody, UserRole } from 'common/interfaces';
import Utils from 'common/utils';
import { AssignmentItem, ConfirmDialog, useClassroomCtx, useLoading, NoResourceDisplay } from 'components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useGetAssignmentsQuery, useRemoveAssignmentMutation, useUpdateAssignmentMutation } from 'services';
import { gradeStructureSx } from './style';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import NotFoundImg from 'assets/images/reading.svg';

//A list of helper functions
const reorder = (list: any[], fromIndex: number, toIndex: number): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);

  return result;
};

export const EditableGradeStructure = () => {
  const { id } = useParams<'id'>();
  const navigate = useNavigate();
  const containerRef = React.useRef(null);
  const { data: assignments, isLoading } = useGetAssignmentsQuery(id as string);
  const [removeAssignment, { isLoading: isRemoving }] = useRemoveAssignmentMutation();
  const [updateAssignment, { isLoading: isUpdating }] = useUpdateAssignmentMutation();
  const [expandItemKey, setExpandKey] = React.useState<string | null>(null);
  const [sortMode, setSortMode] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<IAssignment[]>([]);
  const [anchorMenu, setAnchorMenu] = React.useState<null | HTMLElement>(null);
  const [targetIndex, setCurTargetIndex] = React.useState<number>(-1);

  const [deletedIds, updateDeletedIds] = React.useState<string[]>([]);
  const [confirmation, showConfirmation] = React.useState<boolean>();

  const [loading, setLoading] = useLoading();

  React.useEffect(() => {
    if (assignments) setFormData(assignments);
  }, [assignments]);

  React.useEffect(() => {
    setLoading(Utils.isLoading(isLoading, isRemoving, isUpdating));
  }, [isLoading, isRemoving, isUpdating]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorMenu(event.currentTarget);
    setCurTargetIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorMenu(null);
    setCurTargetIndex(-1);
  };

  const toggleExpand = (curExpandKey: string | null, key: string) => {
    if (curExpandKey === key) setExpandKey(null);
    else setExpandKey(key);
  };

  const handleResetForm = () => {
    setFormData(assignments || []);
    updateDeletedIds([]);
  };

  const handleExitOrdering = () => {
    handleResetForm();
    setSortMode(false);
  };

  const handleDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) return;

    const source = result.source.index;
    const dest = result.destination.index;

    //Droppped at the same location
    if (source === dest) return;

    //Update state
    setSortMode(true);
    setFormData((previous) => reorder(previous, source, dest));
  };

  const handleMoveToTop = (index: number) => {
    setFormData((prv) => reorder(prv, index, 0));
    setAnchorMenu(null);
    setSortMode(true);
  };

  const handleMoveToBottom = (index: number) => {
    setFormData((prv) => reorder(prv, index, prv.length - 1));
    setAnchorMenu(null);
    setSortMode(true);
  };

  const handleRemoveAssignment = (index: number) => {
    updateDeletedIds((prv) => [...prv, formData[index]._id as string]);
    setFormData((prv) => {
      const updated = [...prv];
      updated.splice(index, 1);
      return updated;
    });
    setAnchorMenu(null);
    setSortMode(true);
  };

  const handleCreateAssignment = () => {
    navigate(`/classroom/${id}/work/create`);
  };

  const submitingChanges = async () => {
    if (!assignments || !formData) return;
    for (let i = 0; i < formData.length; i++) {
      if (i < assignments.length && formData[i]._id === assignments[i]._id) continue;
      console.log({ id: id as string, assignmentId: formData[i]._id as string, body: { ui_index: i } });
      await updateAssignment({ id: id as string, assignmentId: formData[i]._id as string, body: { ui_index: i } });
    }
    for (const assignmentId of deletedIds) await removeAssignment({ id: id as string, assignmentId: assignmentId });
  };

  const handleSavingReOrder = () => {
    submitingChanges()
      .then(() => {
        toast.success('Operation succeed');
      })
      .catch((err) => {
        toast.error('Cannot Updating! ' + err.data);
      });
    showConfirmation(false);
    setSortMode(false);
  };

  return (
    <React.Fragment>
      <Container maxWidth="md" sx={gradeStructureSx.form} ref={containerRef}>
        {!sortMode && (
          <Slide direction="left" in={!sortMode} container={containerRef.current}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography sx={gradeStructureSx.formHeader} color="primary">
                Classwork
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
                Edit mode
              </Typography>

              <Stack direction="row" spacing={1}>
                <Tooltip title="Discard changes">
                  <IconButton color="secondary" onClick={handleExitOrdering}>
                    <Close />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Reset ordering">
                  <IconButton color="secondary" onClick={handleResetForm}>
                    <RestartAlt />
                  </IconButton>
                </Tooltip>
                <Button endIcon={<Save />} variant="contained" color="secondary" onClick={() => showConfirmation(true)} disabled={loading}>
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
                {formData.length > 0 ? (
                  formData.map((a: IAssignment, indx: number) => (
                    <Draggable draggableId={'row-' + indx} index={indx} key={indx}>
                      {(dragProvided) => (
                        <div {...dragProvided.draggableProps} {...dragProvided.dragHandleProps} ref={dragProvided.innerRef}>
                          <React.Fragment key={a._id}>
                            <Box sx={gradeStructureSx.criteriaCard} width="100%">
                              <Box sx={gradeStructureSx.dragZone}>
                                <Tooltip title="Drag to reorder">
                                  <DragIndicatorSharp className="dragIcon" />
                                </Tooltip>
                                <IconButton size="small" onClick={(ev: React.MouseEvent<HTMLElement>) => handleMenuOpen(ev, indx)}>
                                  <MoreHorizRounded />
                                </IconButton>
                              </Box>
                              <AssignmentItem
                                data={a}
                                colorMode={sortMode ? 'secondary' : 'primary'}
                                expanded={expandItemKey === a._id}
                                onClick={() => toggleExpand(expandItemKey, a._id || '')}
                                actionBtns={[
                                  <Button color="primary" onClick={() => navigate(`/classroom/${id}/work/details/${a._id}`)}>
                                    View assignment
                                  </Button>,
                                  <Button color="secondary" onClick={() => navigate(`/classroom/${id}/work/edit/${a._id}`)}>
                                    Edit assignment
                                  </Button>,
                                ]}
                              />
                            </Box>
                          </React.Fragment>
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <NoResourceDisplay
                    title="Add assignments"
                    direction="row"
                    img={NotFoundImg}
                    description={
                      <>
                        Click on the below buttons to <br /> add assignments to this class
                      </>
                    }
                    onClick={() => navigate(`/classroom/${id}/work/create`)}
                  />
                )}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Container>

      {confirmation && (
        <ConfirmDialog
          open={confirmation}
          handleClose={() => showConfirmation(false)}
          title={'Proceed updating'}
          description={
            deletedIds.length === 0
              ? 'Finish organizing the assignment order?'
              : "⚠We detected some some assignments deletion ⚠! Please check again if it was an mistakes! Press 'Agree' to proceed with the update & deletion?"
          }
          onConfirm={() => {
            handleSavingReOrder();
            // setRemovingId(null);
          }}
        />
      )}

      <Menu
        id="basic-menu"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleMoveToTop(targetIndex)}>Move to the top</MenuItem>
        <MenuItem onClick={() => handleMoveToBottom(targetIndex)}>Move to the bottom</MenuItem>
        <MenuItem onClick={() => handleRemoveAssignment(targetIndex)} sx={{ color: 'error' }}>
          Remove
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
