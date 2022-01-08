import { INotification } from 'common/interfaces';
export type NotificationContextProps = {
  notifications: INotification[];
  newNotiCount: number;
  isSeen: (id: string) => boolean; //Check seen
  seen: (id: string) => any;
};
