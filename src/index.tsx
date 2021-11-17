import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/styles/index.css';
import { CssBaseline } from '@mui/material';

import { Provider } from 'react-redux';
import { store } from './store';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from 'components';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <CssBaseline />
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals())
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
