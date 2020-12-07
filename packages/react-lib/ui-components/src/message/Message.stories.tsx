import React, { FC } from 'react';
import Message from './Message';
import { MessageProps } from './IMessage';

export default {
  title: 'Message',
  component: Message,
};

const error: MessageProps = {
  messageType: 'error',
  msg: 'Error Message',
  title: 'Error',
};
const warning: MessageProps = {
  messageType: 'warning',
  msg: 'Warning Message',
  title: 'Warning',
};
const info: MessageProps = {
  messageType: 'info',
  msg: 'Info Message',
  title: 'Info',
};
const success: MessageProps = {
  messageType: 'success',
  msg: 'Success Message',
  title: 'Success',
};
export const ErrorMessageComponent: FC = () => <Message {...error} />;
export const WarnMessageComponent: FC = () => <Message {...warning} />;
export const InfoMessageComponent: FC = () => <Message {...info} />;
export const SuccessMessageComponent: FC = () => <Message {...success} />;
