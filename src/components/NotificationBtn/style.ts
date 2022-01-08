import { SxType, MultipleSxTypes } from 'common/type';

export const notificationBtnSx: MultipleSxTypes = {
  container: {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
    pb: 0,
    borderRadius: 2,
  },

  notSeen: {
    fontWeight: 600,

    '& .MuiTypography-root': {
      fontWeight: '600 !important',
    },
  },

  secondaryText: { display: 'inline' },

  viewAllBtn: {
    py: 1,
    bgcolor: 'grey.100',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
};
