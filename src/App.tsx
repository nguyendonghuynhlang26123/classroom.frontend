import { mainTheme } from 'configs/theme.config';
import React from 'react';
import { ThemeContext } from './components/context';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/Login';

function App() {
  return (
    <React.Fragment>
      <ThemeContext themeConfig={mainTheme}>
        {/* <Dashboard /> */}
        <LoginPage />
      </ThemeContext>
    </React.Fragment>
  );
}

export default App;
