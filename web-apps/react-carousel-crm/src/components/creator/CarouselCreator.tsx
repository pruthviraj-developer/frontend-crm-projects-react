import React, { FC } from 'react';
import { CreateCarouselPage } from '@hs/containers';

const CarouselCreator: FC = () => {
  const onSubmit = (data: any) => {
    // console.log(data);
    alert(data);
  };
  const props = {
    action: onSubmit,
  };
  return <CreateCarouselPage {...props} />;
};
export default CarouselCreator;
