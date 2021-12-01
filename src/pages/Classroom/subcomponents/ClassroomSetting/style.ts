import { MultipleSxTypes } from 'common/type';

export const settingModalSx: MultipleSxTypes = {
  root: {
    width: '100vw',
    minHeight: '100vh',
    bgcolor: 'background.paper',

    '& .MuiButton-root': {
      cursor: 'pointer',
      py: 0.5,
    },
  },

  toolbar: {
    borderBottom: 1,
    borderColor: 'divider',
    position: 'sticky',
    bgcolor: 'background.paper',
    zIndex: 4,
    top: 0,
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

    '& .header': {
      fontSize: '24px',
      mb: 1,
    },
    '& .MuiTextField-root': {
      my: 1,
    },
  },

  alertContainer: { display: 'flex', justifyContent: 'flex-end', ml: 'auto', alignItems: 'center' },
};
