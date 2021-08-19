import { Story } from '@storybook/react/types-6-0';
import React, { FC } from 'react';
import { MarkdownViewerProps } from './IMarkdownViewer';
import { MarkdownViewer } from './MarkdownViewer';

export default {
  title: 'MD Viewer',
  component: MarkdownViewer,
};

const Template: Story<MarkdownViewerProps> = (args) => (
  <MarkdownViewer {...args} />
);

export const MDView = Template.bind({});
MDView.args = { docUrl: '/doc/test.md' };
