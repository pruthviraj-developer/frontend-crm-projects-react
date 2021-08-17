import React, { FC } from 'react';
import Message from './Message';
import { MessageProps } from './IMessage';
import { Story } from '@storybook/react/types-6-0';

export default {
  title: 'Message',
  component: Message,
};

const success: MessageProps = {
  messageType: 'success',
  msg: 'Success Message',
  title: 'Success',
};
const Template: Story<MessageProps> = (args) => <Message {...args} />;
export const MessageComponent = Template.bind({});
MessageComponent.args = success;
