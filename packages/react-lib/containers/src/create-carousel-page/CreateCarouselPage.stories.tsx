import React, { FC } from 'react';
import { CreateCarouselPage } from './CreateCarouselPage';
import { CreateCarouselProps } from './ICreateCarouselPage';
import { action } from '@storybook/addon-actions';
export default {
  title: 'Create Carousel Page',
};

const props: CreateCarouselProps = {
  action: action('table-action'),
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const CarouselCardPages: FC = () => <CreateCarouselPage {...props} />;
