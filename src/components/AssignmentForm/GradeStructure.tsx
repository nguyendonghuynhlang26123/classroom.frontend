import React from 'react';
import {
  Box,
  Typography,
  Stack,
  InputAdornment,
  TextField,
  Button,
  Grid,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
} from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { formSx, gradeStructureSx } from './style';
import { Add, Close, MoreHorizRounded, DragIndicatorSharp } from '@mui/icons-material';
import { GradeStructureProps, CriteriaCardProps } from './type';

//A helper function to reorder array
const reorder = (list: any[], fromIndex: number, toIndex: number): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);

  return result;
};

const CriteriaCard = ({ criteria, handleChange, onRemove, onMoveOnBottom, onMoveOnTop }: CriteriaCardProps) => {
  const [anchorMenu, setAnchorMenu] = React.useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenu(event.currentTarget);
  };
  return (
    <Grid container spacing={2} sx={gradeStructureSx.criteriaCard} width="100%">
      <Grid item xs={12} sx={gradeStructureSx.dragZone}>
        <Tooltip title="Drag to reorder">
          <DragIndicatorSharp className="dragIcon" />
        </Tooltip>
        <IconButton size="small" onClick={handleMenuOpen}>
          <MoreHorizRounded />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorMenu}
          open={Boolean(anchorMenu)}
          onClose={() => setAnchorMenu(null)}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem
            onClick={() => {
              onMoveOnTop();
              setAnchorMenu(null);
            }}
          >
            Move to the top
          </MenuItem>
          <MenuItem
            onClick={() => {
              onMoveOnBottom();
              setAnchorMenu(null);
            }}
          >
            Move to the bottom
          </MenuItem>
          <MenuItem
            onClick={() => {
              onRemove();
              setAnchorMenu(null);
            }}
            sx={{ color: 'error' }}
          >
            Remove
          </MenuItem>
        </Menu>
      </Grid>
      <Grid item xs={9}>
        <TextField
          size="small"
          fullWidth
          id="name"
          name="name"
          value={criteria.name}
          onChange={(ev) => handleChange('name', ev?.target?.value)}
          label="Criteria"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          size="small"
          fullWidth
          id="points"
          name="points"
          value={criteria.points}
          onChange={(ev) => handleChange('points', ev?.target?.value)}
          label="Points"
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="end">pts</InputAdornment>,
          }}
        />
      </Grid>
    </Grid>
  );
};

export const GradeStructure = ({ criterias, handleChange }: GradeStructureProps) => {
  const onChange = (index: number, property: string, value: any) => {
    const updatedData = criterias.map((c, i) => (i === index ? { ...c, [property]: value } : c));
    handleChange(updatedData);
  };

  const handleAddOne = () => {
    handleChange([...criterias, { points: '', name: '' }]);
  };

  const handleMoveOnTop = (index: number) => {
    handleChange(reorder(criterias, index, 0));
  };

  const handleMoveToBottom = (index: number) => {
    handleChange(reorder(criterias, index, criterias.length - 1));
  };

  const handleRemoveCriteria = (index: number) => {
    criterias.splice(index, 1);
    handleChange([...criterias]);
  };

  const handleDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    handleChange(reorder(criterias, result.source.index, result.destination.index));
  };

  return (
    <Box sx={formSx.form}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={formSx.formHeader}>Grading criterias</Typography>

        <Button endIcon={<Add />} variant="outlined" onClick={handleAddOne}>
          Add a criteria
        </Button>
      </Stack>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={'criteria'}>
          {(provided) => (
            <Box
              component="div"
              sx={gradeStructureSx.cardContainer}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {criterias.map((c, indx: number) => (
                <Draggable draggableId={'row-' + indx} index={indx} key={indx}>
                  {(dragProvided) => (
                    <div {...dragProvided.draggableProps} {...dragProvided.dragHandleProps} ref={dragProvided.innerRef}>
                      <CriteriaCard
                        criteria={c}
                        handleChange={(property: string, value: any) => onChange(indx, property, value)}
                        index={indx}
                        onRemove={() => handleRemoveCriteria(indx)}
                        onMoveOnBottom={() => handleMoveToBottom(indx)}
                        onMoveOnTop={() => handleMoveOnTop(indx)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};
