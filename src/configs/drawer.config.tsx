import { HomeOutlined, Event, RuleFolderOutlined, FactCheckOutlined } from '@mui/icons-material';
import { DrawerItemConfigType } from 'common/type';
export const drawerItemConfigs: DrawerItemConfigType[] = [
  {
    title: 'Classes',
    icon: <HomeOutlined />,
    href: '/',
    type: 'item',
  },
  {
    title: 'Calendar',
    icon: <Event />,
    href: '/',
    type: 'item',
  },
  {
    title: 'Teaching',
    type: 'group',
    children: [
      {
        title: 'To review',
        icon: <RuleFolderOutlined />,
        href: '/',
        type: 'item',
      },
    ],
  },
  {
    title: 'Enrolled',
    type: 'group',
    children: [
      {
        title: 'To-do',
        icon: <FactCheckOutlined />,
        href: '/',
        type: 'item',
      },
    ],
  },
];
