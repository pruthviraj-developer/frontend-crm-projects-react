import { action } from '@storybook/addon-actions';
import React, { FC } from 'react';
import { FileUpload } from './FileUpload';
export default {
  title: 'File upload Component',
  component: FileUpload,
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const FileUploadComponent: FC = () => (
  <FileUpload
    multiple
    acceptType={['xls']}
    onChange={(value) => action('file-upload')(value)}
  />
);
