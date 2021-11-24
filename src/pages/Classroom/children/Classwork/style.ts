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
  topicContainer: {
    position: 'sticky',
  },

  addBtn: {
    ml: 'auto',
    my: 2,
  },

  header: {
    mt: 4,
    textTransform: 'capitalize',
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
