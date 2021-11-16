import { MultipleSxTypes } from 'common/type';

export const peopleTabSx: MultipleSxTypes = {
  root: {
    width: '650px',
  },

  header: {
    py: 1,
    mt: 3,
    borderBottom: 1,
    borderColor: 'primary.main',
    '& .MuiTypography-root': {
      pl: 2,
      color: 'primary.main',
      fontSize: 32,
    },
  },
};
