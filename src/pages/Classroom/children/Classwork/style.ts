import { MultipleSxTypes } from 'common/type';

export const classworkSx: MultipleSxTypes = {
  root: {
    width: '100%',
    mx: 0,
    py: 0,
    '& .MuiGrid-item': {
      pt: 0,
    },
  },

  addBtn: {
    ml: 'auto',
    my: 2,
  },

  header: {
    mt: 4,
    '& .MuiTypography-root': {
      fontSize: 24,
      color: 'primary.main',
    },
  },

  topicsList: {
    p: 1,
    '& .MuiListItemButton-root': {
      my: 0.5,
      borderRadius: 2,
    },
  },
};
