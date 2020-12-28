import React, { FC } from 'react';
import { CreateCarouselPage } from './CreateCarouselPage';
import { CreateCarouselProps } from './ICreateCarouselPage';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react/types-6-0';

export default {
  title: 'Create Carousel Page',
  component: CreateCarouselPage,
};

const props: CreateCarouselProps = {
  action: action('table-action'),
};

const Template: Story<CreateCarouselProps> = (args) => (
  <CreateCarouselPage {...args} />
);

export const CarouselCardPages = Template.bind({});
CarouselCardPages.args = props;
