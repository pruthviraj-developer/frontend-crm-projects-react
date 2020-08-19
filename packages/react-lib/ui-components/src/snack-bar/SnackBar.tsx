import React, { FC } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { HsSnackbarProps } from './ISnackBar';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={3} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    fontSize: 14,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export interface SnackbarMessage {
  message: string;
  key: number;
}

export const HsSnackbar: FC<HsSnackbarProps> = (props: HsSnackbarProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.open || false);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (event && reason === 'clickaway') {
      return;
    }
    props.onSnackBarClose(false);
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          icon={false}
          style={{ fontSize: '14px' }}
          onClose={handleClose}
          severity={props.type}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
