import { MultipleSxTypes } from 'common/type';

export const formSx: MultipleSxTypes = {
  root: {
    width: '100vw',
    minHeight: '100vh',
    bgcolor: 'background.paper',
    position: 'relative',
    overflow: 'auto',
  },

  toolbar: {
    bgcolor: 'background.paper',
    color: 'text.primary',
    borderBottom: 1,
    borderColor: 'divider',
    width: '100%',
    '& .MuiTypography-root': {
      fontWeight: 500,
    },
    '& .MuiButton-root': {
      textTransform: 'capitalize',
    },
  },

  grid: {
    mt: '64px',
    px: 4,
    py: 2,
    maxWidth: 1200,
    mx: 'auto',
    height: 'calc(100vh - 64px)',
    '& .MuiGrid-item': {
      px: 2,
    },

    '& .MuiGrid-item:first-of-type': {
      borderRight: 1,
      borderColor: 'divider',
    },
  },

  form: {
    p: 3,
    mb: 2,

    border: 1,
    borderColor: 'divider',
    borderRadius: 2,
    '& .MuiTextField-root, & .MuiSelect-root': {
      my: 1,
      fontSize: 14,
    },
  },

  formHeader: {
    fontSize: '24px',
    mb: 1,
  },

  formTitle: {
    fontSize: '16px',
    fontWeight: 500,

    mt: 1,
  },
};

export const gradeStructureSx: MultipleSxTypes = {
  root: {},
  cardContainer: {
    bgcolor: 'grey.100',
    px: 2,
    py: 1,
    mt: 2,
    borderRadius: 2,
  },

  dragZone: {
    textAlign: 'center',
    cursor: 'move',
    color: 'grey.500',
    py: '0 !important',
    display: 'flex',
    position: 'relative',
    justifyContent: 'flex-end',
    '& .dragIcon': {
      position: 'absolute',
      opacity: 0,
      left: '50%',
      transform: 'rotate(90deg)',
      translate: '-100%',
    },
  },

  criteriaCard: {
    my: 1,
    bgcolor: 'background.paper',
    mx: 0,
    px: 1,
    border: 1,
    borderColor: 'divider',
    borderRadius: 2,

    ':hover': {
      boxShadow: 1,
      '.dragIcon': {
        opacity: 1,
      },
    },

    '& .MuiGrid-item': {
      p: 1,
    },
    '& .MuiGrid-item:first-of-type': {
      borderRight: 0,
    },

    '& .MuiTypography-root': { fontSize: 14 },
  },
};
