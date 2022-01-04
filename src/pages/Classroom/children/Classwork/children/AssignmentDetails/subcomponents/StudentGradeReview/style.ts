import { MultipleSxTypes } from 'common/type';

export const gradeReviewSx: MultipleSxTypes = {
  root: {
    mt: 2,
    '& .notfound': {
      border: 1,
      borderRadius: 2,
      borderColor: 'divider',
      px: 6,
    },
  },

  container: {
    mt: 0,
    pr: 0,
    '& .MuiTimelineItem-root:before': {
      display: 'none !important',
    },
  },

  item: {
    '& .icon': {
      width: 24,
      height: 24,
    },

    '& .content': {
      py: '12px',
      px: 2,
      border: 2,
      borderRadius: 2,
      borderColor: 'divider',
      ml: 2,
      my: 1,
      pr: 4,
    },

    '& .title': {
      fontSize: 16,
      fontWeight: 500,
    },

    '& .time': {
      fontSize: 12,
      color: 'grey.500',
    },

    '& .MuiListItemText-primary': {
      color: 'text.primary',
      fontWeight: 500,
    },

    '& .MuiListItemText-secondary': {
      color: 'text.primary',
    },

    '& .info': {
      fontSize: 14,
      ml: 4,
      fontStyle: 'italic',
    },
  },

  finalDecision: {
    p: 2,
    borderRadius: 2,
    ml: 2,
  },

  commentBox: {
    my: 1,
    width: '100%',
    display: 'flex',

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
