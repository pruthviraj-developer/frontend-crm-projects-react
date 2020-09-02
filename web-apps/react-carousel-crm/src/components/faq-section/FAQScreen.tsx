import React from 'react';
import { MarkdownViewer } from '@hs/components';

interface Props {}

export const FAQScreen = (props: Props) => {
  return <MarkdownViewer docUrl="/react-monorepo/PageCarousel/faq.md"></MarkdownViewer>;
};
