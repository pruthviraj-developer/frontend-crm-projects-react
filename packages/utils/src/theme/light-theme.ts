import { createMuiTheme } from '@material-ui/core/styles';
import { Colors } from '../color';

export const LightTheme = createMuiTheme({
  palette: {
    primary: {
      light: Colors.PINK[100],
      main: Colors.PINK[500],
      dark: Colors.PINK[600],
      contrastText: '#fff',
    },
    secondary: {
      light: Colors.GREEN[100],
      main: Colors.GREEN[500],
      dark: Colors.GREEN[900],
      contrastText: '#000',
    },
  },
});
