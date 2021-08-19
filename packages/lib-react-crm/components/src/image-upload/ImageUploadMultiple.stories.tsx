import React from 'react';
import { FC, useState } from 'react';
import {
  ResolutionValidationType,
  ImageListType,
  ImageType,
} from './IImageUpload';
import { withKnobs, number, select } from '@storybook/addon-knobs';
import { carouselService } from '@hs/services';
import { ImageUploadMultiple } from './ImageUploadMultiple';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Image Upload multiple',
  decorators: [withKnobs],
  component: ImageUploadMultiple,
};

const resValType: Record<string, ResolutionValidationType> = {
  absolute: 'absolute',
  less: 'less',
  more: 'more',
  ratio: 'ratio',
};

const uploadFile = async (value: ImageType) => {
  return await carouselService.imageUpload({
    file: value.file,
  });
};

const uploadMultipleFiles = (uploadedFiles: ImageListType, setImageUrls) => {
  const resolvePromises = uploadedFiles.map((data) => uploadFile(data));
  Promise.all(resolvePromises)
    .then((values) => {
      const urls: Array<string> = [];
      values.map((res) => {
        if (res.action === 'success') {
          urls.push(
            `https://${res.imageURLPrefix}/fstatic${res.imageResponse.imageUrl}?version=${res.imageResponse.version}`
          );
        } else {
          action('error')(res);
          setImageUrls([]);
          return;
        }
      });
      setImageUrls(urls);
    })
    .catch((error) => {
      action('error.message')(error.message);
    });
};

export const ImageUploader: FC = () => {
  const previewHeight = number('previewHeight', 200);
  const previewWidth = number('previewWidth', 200);
  const resolutionHeight = number('resolutionHeight', 250);
  const resolutionWidth = number('resolutionWidth', 250);
  const [imageUrls, setImageUrls] = useState<Array<string>>([
    'https://static.hopscotch.in/fstatic/product/202008/067483ca-5952-48fa-863c-f341687d0d9b_full.jpg?version=1597741405901',
    'https://static.hopscotch.in/fstatic/product/202008/067483ca-5952-48fa-863c-f341687d0d9b_full.jpg?version=1597741405901',
    'https://static.hopscotch.in/fstatic/product/202008/067483ca-5952-48fa-863c-f341687d0d9b_full.jpg?version=1597741405901',
  ]);
  const resolutionValidationType = select(
    'Validation Type',
    resValType,
    'less'
  );
  const updateUploadImages = (urls: string[]) => {
    setImageUrls((prevState) => [...prevState, ...urls]);
  };

  return (
    <ImageUploadMultiple
      {...{
        previewHeight,
        previewWidth,
        resolutionHeight,
        resolutionWidth,
        resolutionValidationType,
        onSubmit: (imageUrls?: string[], imageToUpload?: ImageListType) => {
          action('imageUrls')(imageUrls);
          action('imageToUpload')(imageToUpload);
          imageToUpload &&
            uploadMultipleFiles(imageToUpload, updateUploadImages);
          imageUrls && setImageUrls(imageUrls);
        },
        defaultImageUrls: imageUrls,
      }}
    />
  );
};
