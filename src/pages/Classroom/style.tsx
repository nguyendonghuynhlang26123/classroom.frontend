import { MultipleSxTypes } from 'common/type';

export const navSx: MultipleSxTypes = {
  tabsContainer: {
    borderBottom: 1,
    borderColor: 'divider',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    mt: -8,
    '& .MuiTab-root': {
      height: 64,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  link: {
    color: 'text.primary',
    borderColor: 'divider',
  },
  progressBar: {
    mt: '-3px',
  },
};
