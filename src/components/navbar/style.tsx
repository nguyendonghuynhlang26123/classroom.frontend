import { SxType, MultipleSxTypes } from 'common/type';
export const navbarSx: SxType = {
  bgcolor: 'background.paper',
  color: 'text.primary',
  borderBottom: 1,
  borderColor: 'divider',
};

export const drawerSx: MultipleSxTypes = {
  list: {
    width: 300,
    px: 1,
  },
  btnItem: {
    fontWeight: 500,
    fontSize: 16,
    height: 56,

    '& .MuiAvatar-root': {
      bgcolor: 'primary.main',
    },
  },
  textItem: {
    '& .MuiTypography-root': {
      fontWeight: 500,
      fontSize: 12,
      color: 'grey.800',
      letterSpacing: '.2px',
    },
  },
};
