import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import styled from '@emotion/styled';
import { MarkdownViewerProps } from './IMarkdownViewer';
import { Colors } from '@hs/utils';
const StyledMDViewer = styled.div`
  & > h1 {
    text-align: center;
  }
  & > h2,
  h3,
  h4,
  h5,
  h6 {
    text-align: left;
  }
  text-align: left;
  margin-left: 90px;
  table {
    border: 1px solid black;
    border-collapse: collapse;
  }
  th,
  td {
    border: 1px solid black;
    text-align: left;
    padding: 0.8rem;
  }
  tr:nth-of-type(even) {
    background-color: ${Colors.GREY_SHADE[400]};
  }
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
