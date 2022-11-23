import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IViewMoreProps } from './IViewMore';
import { ViewMore } from './ViewMore';

export default {
  title: 'View more',
  component: ViewMore,
};

const Template: Story<IViewMoreProps> = (args) => <ViewMore {...args} />;
export const ViewMoreComponent = Template.bind({});
ViewMoreComponent.args = {
  remainingProductCount: 232,
  viewMore: () => {
    // test
  },
  loadingMore: false,
};

export const ViewMoreComponentLoading = Template.bind({});
ViewMoreComponentLoading.args = {
  remainingProductCount: 232,
  viewMore: () => {
    // test
  },
  loadingMore: true,
};
