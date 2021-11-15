import { MultipleSxTypes } from 'common/type';

export const profileSx: MultipleSxTypes = {
  root: {
    width: '100vw',
    minHeight: '100vh',
    bgcolor: 'background.paper',
    '& .MuiTypography-root': {
      fontWeight: 500,
    },
    '& .MuiButton-root': {
      ml: 'auto',
      textTransform: 'capitalize',
    },
  },

  container: {
    maxWidth: '700px',
  },

  stack: {
    gap: 3,
  },

  form: {
    mt: 3,
    p: 3,
    border: 1,
    borderColor: 'divider',
    borderRadius: 2,
    '& .MuiTypography-root': {
      fontSize: '24px',
      mb: 1,
    },
    '& .MuiTextField-root': {
      my: 1,
    },
    '& .Mui-disabled .MuiInputBase-input': {
      bgcolor: 'grey.200',
      fontWeight: 500,
    },
  },
};