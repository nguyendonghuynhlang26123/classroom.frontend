import { MultipleSxTypes } from 'common/type';

export const disclaimerStyle: MultipleSxTypes = {
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    p: 1,
    bgcolor: 'grey.100',
    my: 2,
    justifyContent: 'start',
  },
};

export const formStyle: MultipleSxTypes = {
  container: {
    mt: 3,
    '& .MuiTextField-root': {
      my: 1,
    },
  },
};
