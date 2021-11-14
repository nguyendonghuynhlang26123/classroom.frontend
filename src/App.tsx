import { mainTheme } from 'configs/theme.config';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeContext, useAuth } from './components/context';
import appRoutes from './pages/route';

function App() {
  const { isAuthenticated } = useAuth();
  const routes = useRoutes(appRoutes(isAuthenticated));

  return (
    <React.Fragment>
      <ThemeContext themeConfig={mainTheme}>{routes}</ThemeContext>
    </React.Fragment>
  );
}

export default App;
