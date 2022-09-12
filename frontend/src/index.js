import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@material-ui/core/styles';
import {theme2} from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme2}>

  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ThemeProvider>
);

