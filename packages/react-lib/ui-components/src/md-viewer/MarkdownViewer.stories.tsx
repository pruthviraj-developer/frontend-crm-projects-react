import React, { FC } from 'react';
import { MarkdownViewer } from './MarkdownViewer';

export default {
  title: 'MD Viewer',
};
export const MDView: FC = () => <MarkdownViewer docUrl="/doc/test.md" />;
