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
export const CarouselComponent = Template.bind({});

CarouselComponent.args = {
  showArrows: false,
  dynamicHeight: false,
  showThumbs: false,
  showStatus: false,
  autoPlay: true,
};
