import React from 'react';
import { ErrorPanel } from './ErrorPanel';

export default {
  title: 'Error Panel',
  component: ErrorPanel,
};

const Template = (args) => <ErrorPanel {...args} />;

export const ErrorComponent = Template.bind({});

ErrorComponent.args = {
  header: 'Error Panel',
  messages: [
    ' testing',
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
};
