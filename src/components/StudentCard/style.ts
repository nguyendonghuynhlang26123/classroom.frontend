import { SxType } from 'common/type';

export const studentCardSx: SxType = {
  display: 'flex',
  border: 1,
  borderColor: 'divider',
  borderRadius: 2,
  boxShadow: 0,

  '& .media': {
    width: 140,
  },

  '& .MuiCardContent-root': {
    display: 'flex',
    flexDirection: 'column',
    px: 3,
  },

  '& .name': {
    fontSize: 20,
    fontWeight: 500,
    my: 0.5,
  },
  '& .email': {
    fontSize: 14,
    color: 'text.secondary',
    my: 0.5,
  },
  '& .id': {
    fontSize: 14,
    color: 'text.secondary',
    my: 0.5,
  },
};
