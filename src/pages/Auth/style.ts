import { MultipleSxTypes } from 'common/type';

export const sharedStyleSx: MultipleSxTypes = {
  root: {
    bgcolor: '#A2D2FF',
  },
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    px: {
      xs: 2,
      sm: 4,
    },
    py: 5,
    borderRadius: 2,
    width: 448,
    maxWidth: 448,
    textAlign: 'center',
    justifyContent: 'space-between',
    '& .MuiButton-root': { my: 1, py: 1.2 },
  },

  form: {
    mt: 3,
    mb: 1,
    '& .MuiTextField-root': { my: 1 },
  },

  signUpContainer: {
    fontStyle: 'italic',
    my: 2,
    justifyContent: 'center',
    gap: 0.5,
    '& .MuiLink-root': { cursor: 'pointer' },
  },
  resetPasswordContainer: {
    fontSize: 14,
    fontStyle: 'italic',
    my: 0.5,
    justifyContent: 'flex-end',
    gap: 0.5,
    '& .MuiLink-root': { cursor: 'pointer' },
    '& .MuiTypography-root': { fontSize: 14 },
  },

  imgContainer: {
    width: '100%',
    '& img': {
      width: '100%',
    },
  },

  divider: {
    my: 2,
  },
};
