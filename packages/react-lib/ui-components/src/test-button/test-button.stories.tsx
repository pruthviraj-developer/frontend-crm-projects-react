import React from 'react';
import { TestButton } from './test-button';
import { primaryColor } from '@hs/utils';

export default {
    title: 'Test Button component',
  };

export const TestButtonComponent = () => <TestButton displayText='Test' color={primaryColor[100]}/>;