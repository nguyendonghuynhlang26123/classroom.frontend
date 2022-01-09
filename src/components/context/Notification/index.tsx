import React from 'react';
import { NotificationContextProps } from './type';
import { useGetAllNotificationQuery } from 'services';
import { useLoading, useLocalStorage } from '../../hooks';
import { useAuth } from '..';
import { INotification } from 'common/interfaces';
import { io, Socket } from 'socket.io-client';
import { JWT_SESSION_KEY } from 'common/constants';

const defaultValue: NotificationContextProps = {
  notifications: [],
  newNotiCount: 0,
  isSeen: (id: string) => false,
  seen: (id: string) => {},
};
const BACKEND_SOCKET_HOST = process.env.REACT_APP_WEB_SOCKET_DOMAIN;

const NotificationContext = React.createContext<NotificationContextProps>(defaultValue);

export const NotificationContextProvider = ({ children }: { children: any }) => {
  const { isAuthenticated } = useAuth();
  const { data, isLoading } = useGetAllNotificationQuery(undefined, { skip: !isAuthenticated });
  const [notifications, setNotifications] = React.useState<INotification[]>([]);
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
    const token = localStorage.getItem(JWT_SESSION_KEY);
    const socket = io(BACKEND_SOCKET_HOST as string, {
      query: { token },
    });

    socket.on('notification', (data: INotification) => {
      setNotifications((curArr) => [data, ...curArr].slice(0, 10));
    });
    return () => {
      socket.disconnect();
    };
  }, []);

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
    seen: seen,
  };
  return <NotificationContext.Provider value={values}>{children}</NotificationContext.Provider>;
};

export const useNotification = () => React.useContext(NotificationContext);
