import { red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

// A custom theme for this app
export const theme1 = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#000000',
    },
    error: {
      main: "#000000",
    },
    background: {
      default: '#000000',
    },
  },
});

export const theme2 = createTheme({
  palette: {
    primary: {
      main: '#8862a1',
    },
    secondary: {
      main: '#f6144a',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});