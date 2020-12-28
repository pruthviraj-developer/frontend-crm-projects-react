import React, { FC } from 'react';
import { CreateNonCarouselProps } from './ICreateNonCarouselPage';
import { action } from '@storybook/addon-actions';
import { CreateNonCarouselPage } from './CreateNonCarouselPage';
import { Story } from '@storybook/react/types-6-0';
export default {
  title: 'Create Non Hero Carousel Page',
  component: CreateNonCarouselPage,
};

const props: CreateNonCarouselProps = {
  action: action('table-action'),
};

const Template: Story<CreateNonCarouselProps> = (args) => (
  <CreateNonCarouselPage {...args} />
);

export const CarouselCardPages = Template.bind({});
CarouselCardPages.args = props;
