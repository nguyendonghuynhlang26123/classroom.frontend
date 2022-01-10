import { LinearProgress } from '@mui/material';
import { NotificationController } from 'components';
import { mainTheme } from 'configs/theme.config';
import React from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import { NotificationContextProvider, ThemeContext, useAuth } from './components/context';
import appRoutes from './pages/route';

function App() {
  const { pathname, search } = useLocation(); // for url params
  const { isAuthenticated, pending } = useAuth();
  const routes = useRoutes(appRoutes(isAuthenticated, search, pathname));

  return (
    <React.Fragment>
      {/* Notification Container */}
      <NotificationController />

      <NotificationContextProvider>
        <ThemeContext themeConfig={mainTheme}>{!pending ? routes : <LinearProgress />}</ThemeContext>
      </NotificationContextProvider>
    </React.Fragment>
  );
}

export default App;
