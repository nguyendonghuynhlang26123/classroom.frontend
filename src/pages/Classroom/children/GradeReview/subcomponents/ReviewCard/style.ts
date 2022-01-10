import { blue } from '@mui/material/colors';
import { SxType } from 'common/type';

export const cardSx: SxType = {
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    '& .text': {
      color: 'primary.main',
    },
  },

  '&.resolved': {
    bgcolor: 'grey.100',
  },

  '&.active': {
    bgcolor: blue[50],
  },

  '& .avatar': {},
  '& .text': {
    flex: 1,
    '& .MuiListItemText-primary': {
      fontSize: 16,
      fontWeight: 500,
    },

    '& .description': {
      fontSize: 14,
      fontWeight: 400,
      color: 'grey.600',
    },
  },

  '& .marks': {
    borderLeft: 1,
    borderColor: 'divider',
    height: '100%',
    px: 1,
    ml: 1,
    textAlign: 'center',
  },
};
