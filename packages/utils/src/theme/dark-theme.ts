import { createMuiTheme } from '@material-ui/core/styles';
import { Colors } from '../color';

//TODO Change colors
export const DarkTheme = createMuiTheme({
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
});
