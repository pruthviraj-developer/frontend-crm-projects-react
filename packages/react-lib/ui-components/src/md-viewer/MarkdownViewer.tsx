import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import styled from '@emotion/styled';
import { MarkdownViewerProps } from './IMarkdownViewer';

const StyledMDViewer = styled.div`
  & > h1 {
    text-align: center;
  }
  & > h2 {
    text-align: left;
  }
  text-align: left;
  margin-left: 90px;
`;
export const MarkdownViewer = ({ docUrl }: MarkdownViewerProps) => {
  const [fileText, setFileText] = useState('');

  useEffect(() => {
    fetch(docUrl)
      .then((res) => res.text())
      .then((text) => setFileText(text));
  }, []);

  return (
    <StyledMDViewer>
      <ReactMarkdown source={fileText} escapeHtml={false}></ReactMarkdown>
    </StyledMDViewer>
  );
};
