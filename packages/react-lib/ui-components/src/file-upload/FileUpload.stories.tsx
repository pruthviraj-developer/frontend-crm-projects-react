import { action } from '@storybook/addon-actions';
import React, { FC } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { FileUpload } from './FileUpload';
import { FileUploadProps } from './IFileUpload';
export default {
  title: 'File upload Component',
  component: FileUpload,
};

const Template: Story<FileUploadProps> = (args) => <FileUpload {...args} />;
export const FileUploadComponent = Template.bind({});

FileUploadComponent.args = {
  multiple: true,
  acceptType: ['xls'],
  reset: true,
  onChange: (value) => action('file-upload')(value),
};
