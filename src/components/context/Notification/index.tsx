import { INotification } from 'common/interfaces';
import React from 'react';
import { useGetAllNotificationQuery } from 'services';
import { io } from 'socket.io-client';
import { useAuth } from '..';
import { useLoading, useLocalStorage } from '../../hooks';
import { NotificationContextProps } from './type';

const defaultValue: NotificationContextProps = {
  notifications: [],
  newNotiCount: 0,
  isSeen: (id: string) => false,
  isRemoved: (id: string) => false,
  seen: (id: string) => {},
  remove: (id: string) => {},
  socketTrigger: 0,
};
const BACKEND_SOCKET_HOST = process.env.REACT_APP_WEB_SOCKET_DOMAIN;

const NotificationContext = React.createContext<NotificationContextProps>(defaultValue);

export const NotificationContextProvider = ({ children }: { children: any }) => {
  const { isAuthenticated, userData } = useAuth();
  const { data, isLoading } = useGetAllNotificationQuery(undefined, { skip: !isAuthenticated });
  const [notifications, setNotifications] = React.useState<INotification[]>([]);
  const [localNoti, setLocalNoti] = useLocalStorage<string[]>('notifications', []);
  const [removedNoti, setRemovedNoti] = useLocalStorage<string[]>('removed-notifications', []);
  const [newCount, setNewCount] = React.useState(0);
  const [trigger, setTrigger] = React.useState(Date.now());

  const [, setLoading] = useLoading();

  const checkSeen = (id: string) => {
    return localNoti.findIndex((n) => n === id) !== -1;
  };
  const checkRemoved = (id: string) => {
    return removedNoti.findIndex((n) => n === id) !== -1;
  };

  const seen = (id: string) => {
    if (!checkSeen(id)) setLocalNoti((arr) => [id, ...arr].slice(0, 20)); //Only store 20 of recent notificiation
  };

  const remove = (id: string) => {
    if (!checkRemoved(id)) setRemovedNoti((arr) => [id, ...arr].slice(0, 20)); //Only store 20 of recent notificiation
  };

  React.useEffect(() => {
    if (userData) {
      const socket = io(BACKEND_SOCKET_HOST as string, {
        query: { userId: userData._id as string },
      });

      socket.on('notification', (data: INotification) => {
        setNotifications((curArr) => [data, ...curArr].slice(0, 10));
        setTrigger(Date.now());
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [userData]);

  React.useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  React.useEffect(() => {
    if (notifications && localNoti) {
      const notSeens = notifications.filter((n) => !checkSeen(n._id as string));
      setNewCount(notSeens.length);
    }
  }, [notifications, localNoti]);

  React.useEffect(() => {
    if (data) setNotifications(data);
  }, [data]);

  const values: NotificationContextProps = {
    ...defaultValue,
    notifications: notifications ?? [],
    newNotiCount: newCount,
    isSeen: checkSeen,
    isRemoved: checkRemoved,
    seen: seen,
    remove: remove,
    socketTrigger: trigger,
  };
  return <NotificationContext.Provider value={values}>{children}</NotificationContext.Provider>;
};

export const useNotification = () => React.useContext(NotificationContext);
