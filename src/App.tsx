import { mainTheme } from 'configs/theme.config';
import React from 'react';
import { ThemeContext } from './components/context';
import Dashboard from './pages/Dashboard';
import ClassroomBoard from './pages/Classroom';
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Register';

function App() {
  return (
    <React.Fragment>
      <ThemeContext themeConfig={mainTheme}>
        {/* <Dashboard /> */}
        <ClassroomBoard />
        {/* <RegisterPage /> */}
      </ThemeContext>
    </React.Fragment>
  );
}

export default App;
