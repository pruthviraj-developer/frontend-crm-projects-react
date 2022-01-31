import React from 'react';
import { ErrorPanel } from './ErrorPanel';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react/types-6-0';
import { ErrorPanelProps } from './IErrorPanel';

export default {
  title: 'Error Panel',
  component: ErrorPanel,
};

const Template: Story<ErrorPanelProps> = (args) => <ErrorPanel {...args} />;

export const ErrorComponent = Template.bind({});

ErrorComponent.args = {
  header: 'Error Panel',
  messages: [
    'testing',
    'Non-Proc: High return due to quality and sizing',
    'Non-Proc: Catalogue culling',
    'Non-Proc: High return due to quality and sizing',
    'Non-Proc: Catalogue culling',
    'Non-Proc: High return due to quality and sizing',
    'Non-Proc: Catalogue culling',
    'Non-Proc: High return due to quality and sizing',
    'Non-Proc: Catalogue culling',
    'Non-Proc: duplicated style in website and the price is higher',
  ],
  onCopy: action('onCopy'),
};
