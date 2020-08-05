import { HTMLAttributes } from 'react';
export interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  messageType: MessageType['messageType'];
  msg: string;
  title: string;
}

export interface MessageType {
  messageType: 'info' | 'warning' | 'error' | 'success';
}
