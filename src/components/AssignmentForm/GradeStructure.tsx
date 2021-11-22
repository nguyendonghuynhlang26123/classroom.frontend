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
} from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import { formSx, gradeStructureSx } from './style';
import { Add, Close, MoreHorizRounded, DragIndicatorSharp } from '@mui/icons-material';
const CriteriaCard = () => {
  const [anchorMenu, setAnchorMenu] = React.useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenu(event.currentTarget);
  };
  return (
    <Grid container spacing={2} sx={gradeStructureSx.criteriaCard} width="100%">
      <Grid item xs={12} sx={gradeStructureSx.dragZone}>
        <DragIndicatorSharp className="dragIcon" />
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
          <MenuItem onClick={() => {}}>Move to the top</MenuItem>
          <MenuItem onClick={() => {}}>Move to the bottom</MenuItem>
          <MenuItem onClick={() => {}} sx={{ color: 'error' }}>
            Remove
          </MenuItem>
        </Menu>
      </Grid>
      <Grid item xs={9}>
        <TextField size="small" fullWidth id="title" label="Criteria" variant="outlined" />
      </Grid>
      <Grid item xs={3}>
        <TextField
          size="small"
          fullWidth
          id="points"
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

export const GradeStructure = () => {
  return (
    <Box sx={formSx.form}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={formSx.formHeader}>Grading criterias</Typography>

        <Button endIcon={<Add />} variant="outlined">
          Add a criteria
        </Button>
      </Stack>

      <Box sx={gradeStructureSx.cardContainer}>
        {[1, 2, 3].map((c: any, indx: number) => (
          <CriteriaCard key={indx} />
        ))}
      </Box>
    </Box>
  );
};
