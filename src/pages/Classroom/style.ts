import { MultipleSxTypes } from 'common/type';

export const navSx: MultipleSxTypes = {
  tabsContainer: {
    borderBottom: 1,
    borderColor: 'divider',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    mt: {
      xs: 0,
      md: -8,
    },
    mb: '-2px',
    '& .MuiTab-root': {
      height: 64,
      justifyContent: 'center',
      alignItems: 'center',
      textTransform: 'capitalize',
      fontWeight: 'semibold',
      fontSize: 14,
      px: 3,
      transition: 'background-color 400ms ease-in-out',
      ':hover': {
        bgcolor: 'grey.100',
      },
    },
  },
  link: {
    color: 'text.primary',
    borderColor: 'divider',
    textTransform: 'capitalize',
  },
  progressBar: {
    mt: '-3px',
  },
};

export const mainSx: MultipleSxTypes = {
  container: {
    mt: 4,
    p: '0 !important',
    maxWidth: '1000px',
  },
};
