import React, { FC } from 'react';
import { CarouselCardPage } from './CarouselCardPage';
export default {
  title: 'Carousel Card',
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const CarouselCardPages: FC = () => <CarouselCardPage />;
