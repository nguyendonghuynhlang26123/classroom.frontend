import { DrawerItemConfigType } from 'common/type';

export type DrawerItemType = DrawerItemConfigType;

export type NavbarProps = {
  children: React.ReactElement | React.ReactElement[];
  items: DrawerItemType[];
  toolbarComponents?: React.ReactElement | React.ReactElement[];
};
