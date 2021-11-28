import { MultipleSxTypes } from 'common/type';

export const peopleTabSx: MultipleSxTypes = {
  root: {
    '& .MuiList-root': {
      mb: 5,
    },
  },

  invite: {
    px: 2,
    py: 1,
    border: 1,
    borderRadius: 2,
    borderColor: 'divider',
    '& .MuiBox-root': {
      whiteSpace: 'nowrap',
      width: '100%',
      overflow: 'hidden',
    },

    '& .link': {
      fontSize: 12,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      color: 'grey.500',
      fontStyle: 'italic',
    },
  },
};
