import React, { FC } from 'react';
import { MarkdownViewer } from './MarkdownViewer';

export default {
  title: 'MD Viewer',
  component: MarkdownViewer,
};
export const MDView: FC = () => <MarkdownViewer docUrl="/doc/test.md" />;
