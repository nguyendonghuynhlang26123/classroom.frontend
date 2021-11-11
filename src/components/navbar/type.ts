import { DrawerItemConfigType } from '../../configs/type';

export type DrawerItemType = DrawerItemConfigType;

export type NavbarProps = {
  children: React.ReactElement;
  items: DrawerItemType[];
  loading?: boolean;
};
