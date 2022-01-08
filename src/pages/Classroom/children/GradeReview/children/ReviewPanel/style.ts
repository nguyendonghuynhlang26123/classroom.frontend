import { MultipleSxTypes } from 'common/type';

export const reviewPanelSx: MultipleSxTypes = {
  root: {},
  header: {
    px: 2,
    py: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',

    '& .MuiTypography-root': {
      fontSize: 21,
      fontWeight: 500,
    },
  },

  main: {
    width: 1200,
    mx: 'auto',
    mt: 3,

    '& .title': {
      fontSize: 18,
      fontWeight: 500,
      py: 1,
    },
  },

  info: {
    '& .assignment-record': {
      width: '100%',
      maxWidth: 600,
      justifyContent: 'space-between',
      borderBottom: 1,
      borderColor: 'divider',
      py: 1.5,
    },

    '& .MuiTypography-noWrap': {
      maxWidth: '60%',
    },

    '& em': {
      fontSize: 12,
      color: 'text.secondary',
    },
  },

  commentSection: {
    mt: 2,
    overflow: 'auto',

    '& input': {
      width: '100%',
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5,
      color: 'grey.900',
      bgcolor: 'grey.50',
      border: 2,
      borderRadius: 0,
      borderStartStartRadius: 2,
      borderEndStartRadius: 2,
      borderColor: 'divider',
      p: 1,
      transition: 'all 150ms ease',

      '&:focus': {
        bgcolor: 'white',
        borderColor: 'primary.main',
        outline: 'none',
      },
    },

    '& .MuiButton-root': {
      boxShadow: 0,
      borderStartStartRadius: 0,
      borderEndStartRadius: 0,
      zIndex: 2,
    },
  },
};
