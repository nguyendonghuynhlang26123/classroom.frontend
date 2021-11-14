import { MultipleSxTypes } from 'common/type';

export const bannerSx: MultipleSxTypes = {
  card_stack: {
    mt: '-98px',
    whiteSpace: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'end',
    '& .MuiIconButton-root': {
      mx: 1,
      my: 0.5,
      color: '#fff',
    },
  },
  card: {
    borderRadius: 2,
  },
  header: {
    color: '#fff',
    width: {
      xs: '80%',
      md: '90%',
    },
    p: 2,
    '& .MuiBox-root': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  },
  header_title: {
    fontSize: 30,
    fontWeight: 500,
  },
  header_section: {
    fontSize: 14,
  },
  content: {
    p: 3,
  },
  expand_row: {
    gap: 1,
    '& .MuiTypography-root:first-of-type': {
      fontWeight: 500,
    },
  },
};
