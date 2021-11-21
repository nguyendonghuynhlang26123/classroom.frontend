import { MultipleSxTypes } from 'common/type';

export const formSx: MultipleSxTypes = {
  root: {
    width: '100vw',
    height: '100vh',
    bgcolor: 'background.paper',
  },

  toolbar: {
    borderBottom: 1,
    borderColor: 'divider',
    '& .MuiTypography-root': {
      fontWeight: 500,
    },
    '& .MuiButton-root': {
      textTransform: 'capitalize',
    },
  },

  grid: {
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
