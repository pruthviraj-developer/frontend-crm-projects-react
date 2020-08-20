import React from 'react';
import { FC } from 'react';
import { HsSnackbar } from './SnackBar';
import { action } from '@storybook/addon-actions';
export default {
  title: 'Snack Bar',
};
const props = {
  open: true,
  message: 'Test the toaster',
  type: 'success' as const,
  onSnackBarClose: action('onSnackBarClose'),
};
const propss = {
  open: true,
  message: 'Test the toaster',
  type: 'warning' as const,
  onSnackBarClose: action('onSnackBarClose'),
};
export const SnackbarSuccess: FC = () => <HsSnackbar {...props} />;
export const SnackbarError: FC = () => <HsSnackbar {...propss} />;
