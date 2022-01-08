import React from 'react';
import { NotificationContextProps } from './type';
import { useGetAllNotificationQuery } from 'services';
import { useLoading, useLocalStorage } from '../../hooks';
import { useAuth } from '..';

const defaultValue: NotificationContextProps = {
  notifications: [],
  newNotiCount: 0,
  isSeen: (id: string) => false,
  seen: (id: string) => {},
};

const NotificationContext = React.createContext<NotificationContextProps>(defaultValue);

export const NotificationContextProvider = ({ children }: { children: any }) => {
  const { isAuthenticated } = useAuth();
  const { data: notifications, isLoading } = useGetAllNotificationQuery(undefined, { skip: !isAuthenticated });
  const [localNoti, setLocalNoti] = useLocalStorage<string[]>('notifications', []);
  const [newCount, setNewCount] = React.useState(0);

  const [, setLoading] = useLoading();

  const checkSeen = (id: string) => {
    return localNoti.findIndex((n) => n === id) !== -1;
  };

  const seen = (id: string) => {
    if (!checkSeen(id)) setLocalNoti((arr) => [id, ...arr].slice(0, 10)); //Only store 10 of recent notificiation
  };

  React.useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  React.useEffect(() => {
    if (notifications && localNoti) {
      const notSeens = notifications.filter((n) => !checkSeen(n._id as string));
      setNewCount(notSeens.length);
    }
  }, [notifications, localNoti]);

  const values: NotificationContextProps = {
    ...defaultValue,
    notifications: notifications ?? [],
    newNotiCount: newCount,
    isSeen: checkSeen,
    seen: seen,
  };
  return <NotificationContext.Provider value={values}>{children}</NotificationContext.Provider>;
};

export const useNotification = () => React.useContext(NotificationContext);
