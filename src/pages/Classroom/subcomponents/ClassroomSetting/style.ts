import { MultipleSxTypes } from 'common/type';

export const settingModalSx: MultipleSxTypes = {
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
      ml: 'auto',
      textTransform: 'capitalize',
    },
  },

  container: {
    maxWidth: '700px',
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
  },
};
