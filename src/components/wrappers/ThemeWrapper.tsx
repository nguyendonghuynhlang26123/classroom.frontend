import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import React from 'react';

const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
  },
});

export const ThemeWrapper = ({ children }: any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
