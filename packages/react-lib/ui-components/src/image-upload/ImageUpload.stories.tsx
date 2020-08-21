import React from 'react';
import { ImageUpload } from './ImageUpload';
import { FC } from 'react';
import { ResolutionValidationType, ImageListType } from './IImageUpload';
import { withKnobs, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { carouselService } from '@hs/services';

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

const handleChange = async (value: ImageListType) => {
  try {
    //https://qastatic.hopscotch.in/fstatic/boutique/banner/202008/1308f9cb-8f13-4151-8cda-48be32ded77d_full.jpg
    const res = await carouselService.imageUpload({
      file: value[0].file,
    });
    action('image-upload')(res);
  } catch (err) {
    action('image-error')(err);
  }
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
        onChange: handleChange,
      }}
    />
  );
};
