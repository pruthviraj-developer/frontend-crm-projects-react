import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { ProductCarousel } from './ProductCarousel';
export default {
  title: 'Product Carousel',
  component: ProductCarousel,
};

const Template: Story<{}> = (args) => <ProductCarousel {...args} />;
export const CarouselComponent = Template.bind({});

CarouselComponent.args = {};
