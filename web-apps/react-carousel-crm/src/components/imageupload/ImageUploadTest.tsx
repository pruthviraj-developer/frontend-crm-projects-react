import React, { FC } from 'react';
import { ImageUpload, ImageListType } from '@hs/components';
import { carouselService } from '@hs/services';

export const ImageUploadTest: FC = () => {
  const handleChange = async (value: ImageListType) => {
    const res = await carouselService.imageUpload({ file: value[0].file });
    alert(res);
  };
  return (
    <div>
      <ImageUpload onChange={handleChange}></ImageUpload>
    </div>
  );
};
