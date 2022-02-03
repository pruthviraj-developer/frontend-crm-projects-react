import { Story } from '@storybook/react/types-6-0';
import React from 'react';
import { CardProps, CardButtonTypeProps } from './Icard';
import { Card } from './card';
import { action } from '@storybook/addon-actions';

const onPageChange = (data) => {
  action('onPageChange')(JSON.stringify(data));
};

const primaryButtonType: CardButtonTypeProps = 'primary';

const props = {
  cardsList: [
    {
      pid: 7223727,
      imageUrl: 'https://via.placeholder.com/300/09f/fff.png',
      attributes: [
        {
          label: 'fabric',
          value: 'cotton',
        },
        {
          label: 'price',
          value: 199.99,
        },
        {
          label: 'season',
          value: 'winter',
        },
      ],
    },
    {
      pid: 7278721,
      imageUrl: 'https://via.placeholder.com/300/09f/fff.png',
      attributes: [
        {
          label: 'fabric',
          value: 'silk',
        },
        {
          label: 'price',
          value: 79.99,
        },
        {
          label: 'season',
          value: 'summer',
        },
      ],
    },
    {
      pid: 7298727,
      imageUrl: 'https://via.placeholder.com/300/09f/fff.png',
      attributes: [
        {
          label: 'fabric',
          value: 'cotton',
        },
        {
          label: 'price',
          value: 199.99,
        },
        {
          label: 'season',
          value: 'winter',
        },
      ],
    },
    {
      pid: 72721,
      imageUrl: 'https://via.placeholder.com/300/09f/fff.png',
      attributes: [
        {
          label: 'fabric',
          value: 'silk',
        },
        {
          label: 'price',
          value: 79.99,
        },
        {
          label: 'season',
          value: 'summer',
        },
      ],
    },
    {
      pid: 72727,
      imageUrl: 'https://via.placeholder.com/300/09f/fff.png',
      attributes: [
        {
          label: 'fabric',
          value: 'cotton',
        },
        {
          label: 'price',
          value: 199.99,
        },
        {
          label: 'season',
          value: 'winter',
        },
        {
          label: 'GMV Contr',
          value: 90982,
        },
      ],
    },
    {
      pid: 72721,
      imageUrl: 'https://via.placeholder.com/300/09f/fff.png',
      attributes: [
        {
          label: 'fabric',
          value: 'silk',
        },
        {
          label: 'price',
          value: 79.99,
        },
        {
          label: 'season',
          value: 'summer',
        },
      ],
    },
    {
      pid: 72727,
      imageUrl: 'https://via.placeholder.com/300/09f/fff.png',
      attributes: [
        {
          label: 'fabric',
          value: 'cotton',
        },
        {
          label: 'price',
          value: 199.99,
        },
        {
          label: 'season',
          value: 'winter',
        },
      ],
    },
    {
      pid: 72721,
      imageUrl: 'https://via.placeholder.com/300/09f/fff.png',
      attributes: [
        {
          label: 'fabric',
          value: 'silk',
        },
        {
          label: 'price',
          value: 79.99,
        },
        {
          label: 'season',
          value: 'summer',
        },
      ],
    },
    {
      pid: 72721,
      imageUrl: 'https://via.placeholder.com/300/09f/fff.png',
      attributes: [
        {
          label: 'fabric',
          value: 'silk',
        },
        {
          label: 'price',
          value: 79.99,
        },
        {
          label: 'season',
          value: 'summer',
        },
      ],
    },
  ],
  onPageChange: onPageChange,
  updatePids: onPageChange,
  decisionType: 'discovery',
  itemType: 'KEEP',
  page: 0,
  carouselKey: 'discovery',
  label: 'Discovery Cull PIDS',
  actionButton: 'Mark as Keep',
  buttonType: primaryButtonType,
};

export default {
  title: 'Card',
  component: Card,
};

const CardTemplate: Story<CardProps> = (args) => <Card {...args} />;

export const CardComponent = CardTemplate.bind({});
CardComponent.args = {
  ...props,
};
