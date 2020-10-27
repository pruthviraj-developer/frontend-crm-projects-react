import React, { FC } from 'react';
import { FileUploadPage } from './FileUploadPage';
export default {
  title: 'File upload Screen',
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const FileUploadScreen: FC = () => <FileUploadPage />;
