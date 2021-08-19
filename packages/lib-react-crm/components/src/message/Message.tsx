import React, { FC } from 'react';
import styled from '@emotion/styled';
import { MessageProps } from './IMessage';

const messageStyle = (props: MessageProps) => {
  let style;
  switch (props.messageType) {
    case 'info':
      style = { backgroundColor: '#e0f5fb', color: 'darkblue' };
      break;
    case 'error':
      style = { backgroundColor: '#ffe0e0', color: 'red' };
      break;
    case 'warning':
      style = { backgroundColor: '#fcf4e0', color: 'darkorange' };
      break;
    case 'success':
      style = { backgroundColor: '#e0fdec', color: 'green' };
      break;
  }
  return style;
};

const StyledMessage = styled.div<MessageProps>`
  align-content: center;
  padding: 12px 10px;
  margin: auto;
  border-radius: 5%;
  width: 80%;
  ${messageStyle};
  div {
    text-align: center;
  }
  p {
    text-align: center;
  }
`;

const Message: FC<MessageProps> = (props: MessageProps) => {
  return (
    <StyledMessage {...props}>
      <div>{props.title || ''}</div>
      <p>{props.msg}</p>
    </StyledMessage>
  );
};

export default Message;
