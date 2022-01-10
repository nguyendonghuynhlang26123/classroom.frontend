import { MultipleSxTypes } from 'common/type';

export const changePassSx: MultipleSxTypes = {
  root: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& .MuiButton-root': {
      cursor: 'pointer',
      py: 1,
      borderRadius: 0,
    },
  },

  container: {
    maxWidth: '400px',
    overflow: 'hidden',
    borderRadius: 2,
  },

  form: {
    px: 3,
    py: 2,
    '& .header': {
      fontSize: '20px',
      mb: 1,
    },
    '& .MuiTextField-root': {
      my: 1,
    },
  },

  alertContainer: { display: 'flex', justifyContent: 'flex-end', ml: 'auto', alignItems: 'center' },
};
