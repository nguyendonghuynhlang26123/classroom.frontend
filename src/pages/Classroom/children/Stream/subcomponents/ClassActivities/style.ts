import { MultipleSxTypes } from 'common/type';

export const activitySx: MultipleSxTypes = {
  root: {
    mt: 2,
    '& .notfound': {
      border: 1,
      borderRadius: 2,
      borderColor: 'divider',
      px: 6,
    },
  },

  activityContainer: {
    my: 1,
    maxHeight: 500,
    overflow: 'auto',
    '& .MuiTimelineItem-root:before': {
      display: 'none !important',
    },
    '& .MuiTimelineDot-root': {
      my: 1,
    },
  },

  activityItem: {
    '& .icon': {
      width: 32,
      height: 32,
      bgcolor: 'primary.main',
    },

    '& .content': {
      py: '12px',
      px: 2,
      border: 2,
      borderRadius: 2,
      borderColor: 'divider',
      ml: 2,
      my: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    '& .title': {
      fontSize: 16,
      fontWeight: 500,
    },

    '& .time': {
      fontSize: 12,
      color: 'grey.500',
    },
  },
};
