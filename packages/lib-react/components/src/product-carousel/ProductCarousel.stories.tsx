import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { ProductCarousel } from './ProductCarousel';
import { IProductCarouselProps } from './IProductCarousel';
export default {
  title: 'Product Carousel',
  component: ProductCarousel,
};

const Template: Story<IProductCarouselProps> = (args) => (
  <ProductCarousel {...args} />
);
export const Carousel = Template.bind({});

Carousel.args = {
  showArrows: false,
  autoPlay: true,
  draggable: false,
  focusOnSelect: false,
  renderButtonGroupOutside: false,
  renderDotsOutside: false,
  slidesToSlide: 1,
  swipeable: false,
  showDots: false,
};
