import { MultipleSxTypes } from 'common/type';

export const gradeReviewSx: MultipleSxTypes = {
  root: {
    mt: -4,
  },

  gridContainer: {
    width: '100%',
    m: 0,
    mt: -4,

    '& .MuiGrid-item': {
      p: 0,
      maxHeight: 'calc(100vh - 64px)',
      minHeight: 'calc(100vh - 64px)',
      overflow: 'auto',
      pb: 4,
    },

    '& .MuiGrid-item:first-of-type': {
      borderRight: 2,
      borderColor: 'divider',
    },
  },
};
