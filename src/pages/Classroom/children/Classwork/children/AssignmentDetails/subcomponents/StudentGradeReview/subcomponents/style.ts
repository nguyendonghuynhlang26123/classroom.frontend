import { SxType } from 'common/type';

export const reviewCommentSx: SxType = {
  my: 1,
  width: '100%',
  display: 'flex',

  '& input': {
    width: '100%',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
    color: 'grey.900',
    bgcolor: 'grey.50',
    border: 2,
    borderRadius: 0,
    borderStartStartRadius: 2,
    borderEndStartRadius: 2,
    borderColor: 'divider',
    p: 1,
    transition: 'all 150ms ease',

    '&:focus': {
      bgcolor: 'white',
      borderColor: 'primary.main',
      outline: 'none',
    },
  },

  '& .MuiButton-root': {
    boxShadow: 0,
    borderStartStartRadius: 0,
    borderEndStartRadius: 0,
    zIndex: 2,
  },
};
