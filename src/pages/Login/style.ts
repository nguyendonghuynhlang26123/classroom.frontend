import { MultipleSxTypes } from 'common/type';

export const loginSx: MultipleSxTypes = {
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    px: {
      xs: 2,
      sm: 4,
    },
    py: 5,
    borderRadius: 2,
    width: 448,
    textAlign: 'center',
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
  },

  divider: {
    my: 2,
  },
};

export const pageStyle: React.CSSProperties = {
  background: '#A2D2FF',
};
