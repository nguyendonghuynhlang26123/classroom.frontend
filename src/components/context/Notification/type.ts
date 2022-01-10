import { INotification } from 'common/interfaces';
export type NotificationContextProps = {
  notifications: INotification[];
  newNotiCount: number;
  isSeen: (id: string) => boolean; //Check seen
  isRemoved: (id: string) => boolean; //Check seen
  seen: (id: string) => any;
  remove: (id: string) => any;
  socketTrigger: number; //a value to listen using React.useEffect()
};
