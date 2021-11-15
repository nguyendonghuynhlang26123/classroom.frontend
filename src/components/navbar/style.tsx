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
  },
  textItem: {
    height: 40,
    '& .MuiTypography-root': {
      fontWeight: 500,
      fontSize: 14,
      letterSpacing: '.5px',
    },
  },
};
