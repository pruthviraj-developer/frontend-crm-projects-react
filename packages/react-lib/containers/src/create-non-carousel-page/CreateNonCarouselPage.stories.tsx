import React, { FC } from 'react';
import { CreateNonCarouselProps } from './ICreateNonCarouselPage';
import { action } from '@storybook/addon-actions';
import { CreateNonCarouselPage } from './CreateNonCarouselPage';
export default {
  title: 'Create Non Hero Carousel Page',
  component: CreateNonCarouselPage,
};

const props: CreateNonCarouselProps = {
  action: action('table-action'),
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const CarouselCardPages: FC = () => <CreateNonCarouselPage {...props} />;
