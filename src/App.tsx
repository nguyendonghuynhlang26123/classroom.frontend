import { LinearProgress } from '@mui/material';
import { NotificationSnackbar } from 'components';
import { mainTheme } from 'configs/theme.config';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { hideMessage } from 'store/slices';
import { ThemeContext, useAuth } from './components/context';
import appRoutes from './pages/route';

function App() {
  const dispatch = useAppDispatch();
  const { message, type } = useAppSelector((state) => state.message);
  const { isAuthenticated, pending } = useAuth();
  const routes = useRoutes(appRoutes(isAuthenticated));

  return (
    <React.Fragment>
      <NotificationSnackbar
        open={message !== ''}
        msg={message}
        severity={type}
        handleClose={() => dispatch(hideMessage())}
      />
      <ThemeContext themeConfig={mainTheme}>{!pending ? routes : <LinearProgress />}</ThemeContext>
    </React.Fragment>
  );
}

export default App;
