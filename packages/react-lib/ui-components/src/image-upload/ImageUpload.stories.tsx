import React from 'react';
import ImageUpload from './ImageUpload';
import { FC } from 'react';

export default {
  title: 'Image Uploader',
};

const maxHeightFail = {
  maxHeight: 10,
};
const maxWidthFail = {
  maxWidth: 10,
};
const minHeightFail = {
  minHeight: 10000,
};
const minWidthFail = {
  minWidth: 10000,
};

export const SuccessImageUpload: FC = () => <ImageUpload />;
export const MaxHeightFailImageUpload: FC = () => (
  <ImageUpload {...maxHeightFail} />
);
export const MaxWidthFailImageUpload: FC = () => (
  <ImageUpload {...maxWidthFail} />
);
export const MinHeightFailImageUpload: FC = () => (
  <ImageUpload {...minHeightFail} />
);
export const MinWidthFailImageUpload: FC = () => (
  <ImageUpload {...minWidthFail} />
);
