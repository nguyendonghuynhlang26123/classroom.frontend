import { mainTheme } from 'configs/theme.config';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeContext } from './components/context';
import appRoutes from './pages/route';

function App() {
  const routes = useRoutes(appRoutes(false));
  return (
    <React.Fragment>
      <ThemeContext themeConfig={mainTheme}>{routes}</ThemeContext>
    </React.Fragment>
  );
}

export default App;
