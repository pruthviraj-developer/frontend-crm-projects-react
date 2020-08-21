import React from 'react';
import { ImageUpload, ImageListType } from '@hs/components';
import { carouselService } from '@hs/services';
import { ImageUploadRes } from '@hs/services/dist/carousel/Icarousel.service';
interface Props {}

export const ImageUploadTest = (props: Props) => {
  const handleChange = async (value: ImageListType) => {
    const res = await carouselService.imageUpload({ file: value[0].file });
    console.log(res.imageResponse.imageUrl);
  };
  return (
    <div>
      <ImageUpload onChange={handleChange}></ImageUpload>
    </div>
  );
};
