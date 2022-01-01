import { MultipleSxTypes } from 'common/type';

export const codeSx: MultipleSxTypes = {
  classCode: {
    p: 2,
    borderRadius: 2,
    borderColor: 'divider',

    '& .title': {
      fontSize: 14,
      fontWeight: 500,
    },
    '& .code': {
      fontSize: 24,
      alignItems: 'center',
      py: 1,
    },
  },
};
