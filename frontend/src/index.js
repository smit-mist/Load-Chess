import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@material-ui/core/styles';
import {theme1} from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme1}>

  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ThemeProvider>
);

