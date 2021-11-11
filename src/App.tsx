import React from 'react';
import { ThemeWrapper } from './components/wrappers/ThemeWrapper';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <div className="App">
      <ThemeWrapper>
        <Dashboard />
      </ThemeWrapper>
    </div>
  );
}

export default App;
