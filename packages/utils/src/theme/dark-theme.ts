import { createTheme } from '@material-ui/core/styles';
import { Colors } from '../color';

//TODO Change colors
export const DarkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      light: Colors.PINK[100],
      main: Colors.PINK[500],
      dark: Colors.PINK[900],
      contrastText: '#fff',
    },
    secondary: {
      light: Colors.GREEN[100],
      main: Colors.GREEN[500],
      dark: Colors.GREEN[900],
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Averta',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
