import React from 'react';
import { ImageUpload } from './ImageUpload';
import { FC } from 'react';
import { ResolutionValidationType } from './IImageUpload';
import { withKnobs, number, select } from '@storybook/addon-knobs';

export default {
  title: 'Image Uploader',
  decorators: [withKnobs],
};

const resValType: Record<string, ResolutionValidationType> = {
  absolute: 'absolute',
  less: 'less',
  more: 'more',
  ratio: 'ratio',
};

export const ImageUploader: FC = () => {
  const previewHeight = number('previewHeight', 200);
  const previewWidth = number('previewWidth', 200);
  const resolutionHeight = number('resolutionHeight', 200);
  const resolutionWidth = number('resolutionWidth', 200);

  const resolutionValidationType = select(
    'Validation Type',
    resValType,
    'less'
  );
  return (
    <ImageUpload
      {...{
        previewHeight,
        previewWidth,
        resolutionHeight,
        resolutionWidth,
        resolutionValidationType,
      }}
    />
  );
};
