import React from 'react';
import { HsSnackbar } from './SnackBar';
import { action } from '@storybook/addon-actions';
import { HsSnackbarProps } from './ISnackBar';
import { Story } from '@storybook/react/types-6-0';
export default {
  title: 'Snack Bar',
  component: HsSnackbar,
};
const successProps = {
  open: true,
  message: 'Test the toaster',
  type: 'success' as const,
  onSnackBarClose: action('onSnackBarClose'),
};

const Template: Story<HsSnackbarProps> = (args) => <HsSnackbar {...args} />;
export const SnackbarComponent = Template.bind({});
SnackbarComponent.args = successProps;
