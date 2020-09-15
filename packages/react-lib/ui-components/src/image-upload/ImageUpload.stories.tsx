import React from 'react';
import { ImageUpload } from './ImageUpload';
import { FC, useState } from 'react';
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

const handleChange = async (value: ImageListType, setImageUrl) => {
  try {
    //https://qastatic.hopscotch.in/fstatic/boutique/banner/202008/1308f9cb-8f13-4151-8cda-48be32ded77d_full.jpg
    const res = await carouselService.imageUpload({
      file: value[0].file,
    });
    setImageUrl(
      `https://${res.imageURLPrefix}/fstatic${res.imageResponse.imageUrl}?version=${res.imageResponse.version}`
    );
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
  const [imageUrl, setImageUrl] = useState(
    'https://static.hopscotch.in/fstatic/product/202008/067483ca-5952-48fa-863c-f341687d0d9b_full.jpg?version=1597741405901'
  );
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
        onChange: (value: ImageListType) => {
          handleChange(value, setImageUrl);
        },
        imageUrl,
      }}
    />
  );
};
