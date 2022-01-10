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
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 150,

    '& label': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'ease-in-out 200ms',
      borderRadius: 1,

      '& input': {
        display: 'none',
      },

      '& .MuiSvgIcon-root': {
        opacity: 0,
        color: 'white',
      },

      ':hover': {
        bgcolor: 'rgba(0,0,0,0.4)',
        '& .MuiSvgIcon-root': {
          opacity: 1,
        },
      },
    },
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
