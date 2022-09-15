import { red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

// A custom theme for this app
export const theme1 = createTheme({
  
});

export const theme2 = createTheme({
  palette: {
    primary: {
      main: '#888888',
    },
    secondary: {
      main: '#888888',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#888888',
    },
  },
});