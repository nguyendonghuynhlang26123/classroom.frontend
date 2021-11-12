import { SxProps } from '@mui/system';
export type DrawerItemConfigType = {
  title: string;
  icon?: React.ReactElement;
  href?: string;
  type: 'item' | 'group' | 'divider';
  children?: DrawerItemConfigType[];
};

export type SxType = SxProps;
export type MultipleSxTypes = { [key: string]: SxProps };
