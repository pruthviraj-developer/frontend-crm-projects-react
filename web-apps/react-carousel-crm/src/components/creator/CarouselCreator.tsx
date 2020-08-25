import React, { FC } from 'react';
import { CreateNonCarouselPage, CreateCarouselProps } from '@hs/containers';

const CarouselCreator: FC = () => {
  const onSubmit = (data: any) => {
    alert(data);
    console.log(data);
  };

  const props: CreateCarouselProps = {
    action: onSubmit,
  };
  return <CreateNonCarouselPage {...props} />;
};
export default CarouselCreator;
