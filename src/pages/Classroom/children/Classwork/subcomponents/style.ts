import { MultipleSxTypes } from 'common/type';
export const gradeStructureSx: MultipleSxTypes = {
  root: {},
  form: {
    p: 3,
    mb: 2,
    overflow: 'hidden',

    border: 1,
    borderColor: 'divider',
    borderRadius: 2,
    '& .MuiTextField-root, & .MuiSelect-root': {
      my: 1,
      fontSize: 14,
    },
  },

  formHeader: {
    fontSize: 24,
    alignItems: 'center',
  },

  cardContainer: {
    px: 2,
    py: 1,
    mt: 2,
    borderRadius: 2,
    transition: '0.4s ease-in-out',
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
  },
};
