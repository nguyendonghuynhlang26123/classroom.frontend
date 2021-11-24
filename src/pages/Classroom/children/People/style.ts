import { MultipleSxTypes } from 'common/type';

export const peopleTabSx: MultipleSxTypes = {
  root: {
    maxWidth: '650px',
  },

  header: {
    py: 1,
    mt: {
      md: 0,
      xs: 4,
    },
    px: 2,
    borderBottom: 1,
    borderColor: 'primary.main',
    '& .MuiTypography-root': {
      color: 'primary.main',
      fontSize: 32,
    },
    '& .MuiButtonBase-root': {
      color: 'primary.main',
      width: 48,
    },
  },
};
