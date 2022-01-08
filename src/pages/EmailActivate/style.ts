import { MultipleSxTypes } from 'common/type';

export const activatePageSx: MultipleSxTypes = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    '& img': {
      width: '100%',
    },
  },
  paper: {
    px: {
      xs: 2,
      sm: 4,
    },
    borderRadius: 2,
    width: 700,
    textAlign: 'center',
  },

  paper_title: {
    fontWeight: 600,
  },
};
