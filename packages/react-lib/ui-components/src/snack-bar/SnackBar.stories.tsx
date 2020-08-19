import React from 'react';
import { FC } from 'react';
import { HsSnackbar } from './SnackBar';
export default {
  title: 'Snack Bar',
};
const close = (data) => {
  console.log(data);
};
const props = {
  open: true,
  message: 'Test the toaster',
  type: 'success' as const,
  onSnackBarClose: close,
};
const propss = {
  open: true,
  message: 'Test the toaster',
  type: 'warning' as const,
  onSnackBarClose: close,
};
export const SnackbarSuccess: FC = () => <HsSnackbar {...props} />;
export const SnackbarError: FC = () => <HsSnackbar {...propss} />;
