import { SxType, MultipleSxTypes } from 'common/type';

export const notificationBtnSx: MultipleSxTypes = {
  container: {
    width: 360,
    maxHeight: 500,
    overflow: 'auto',
    position: 'relative',
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
    position: 'sticky',
    bottom: 0,
    borderTop: 1,
    borderColor: 'divider',
    zIndex: 4,
  },

  actionBtns: {
    fontSize: 13,
  },
};
