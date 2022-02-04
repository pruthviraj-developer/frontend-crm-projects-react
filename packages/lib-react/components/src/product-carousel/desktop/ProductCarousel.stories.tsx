import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { ProductCarouselDesktop } from './ProductCarouselDesktop';
import { IProductCarouselProps } from '../IProductCarousel';
export default {
  title: 'Carousel Desktop',
  component: ProductCarouselDesktop,
};

const Template: Story<IProductCarouselProps> = (args) => (
  <ProductCarouselDesktop {...args} />
);
export const CarouselDesktop = Template.bind({});

CarouselDesktop.args = {
  imgUrls: [
    {
      imgUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201907/5b6993b2-24a0-4c84-ac79-08ae53adea38_medium.jpg?version=1563968372323',
      imgUrlLarge:
        'https://qastatic.hopscotch.in/fstatic/product/201907/5b6993b2-24a0-4c84-ac79-08ae53adea38_large.jpg?version=1563968372323',
      imgUrlFull:
        'https://qastatic.hopscotch.in/fstatic/product/201907/5b6993b2-24a0-4c84-ac79-08ae53adea38_full.jpg?version=1563968372323',
      imgUrlThumbnail:
        'https://qastatic.hopscotch.in/fstatic/product/201907/5b6993b2-24a0-4c84-ac79-08ae53adea38_thumbnail.jpg?version=1563968372323',
      isCover: true,
      imgUrlHeight: 360,
      imgUrlWidth: 360,
      imgUrlLargeHeight: 600,
      imgUrlLargeWidth: 600,
      imgUrlFullHeight: 1000,
      imgUrlFullWidth: 1000,
      imgUrlThumbnailHeight: 70,
      imgUrlThumbnailWidth: 70,
    },
    {
      imgUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201907/64c5c1ac-fbf6-4fb4-93b0-7655c0f97f1b_medium.jpg?version=1563968373040',
      imgUrlLarge:
        'https://qastatic.hopscotch.in/fstatic/product/201907/64c5c1ac-fbf6-4fb4-93b0-7655c0f97f1b_large.jpg?version=1563968373040',
      imgUrlFull:
        'https://qastatic.hopscotch.in/fstatic/product/201907/64c5c1ac-fbf6-4fb4-93b0-7655c0f97f1b_full.jpg?version=1563968373040',
      imgUrlThumbnail:
        'https://qastatic.hopscotch.in/fstatic/product/201907/64c5c1ac-fbf6-4fb4-93b0-7655c0f97f1b_thumbnail.jpg?version=1563968373040',
      isCover: false,
      imgUrlHeight: 360,
      imgUrlWidth: 360,
      imgUrlLargeHeight: 600,
      imgUrlLargeWidth: 600,
      imgUrlFullHeight: 1000,
      imgUrlFullWidth: 1000,
      imgUrlThumbnailHeight: 70,
      imgUrlThumbnailWidth: 70,
    },
    {
      imgUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201907/6de3bbc8-7e8c-4cfa-9073-1fbad8e146a7_medium.jpg?version=1563968373784',
      imgUrlLarge:
        'https://qastatic.hopscotch.in/fstatic/product/201907/6de3bbc8-7e8c-4cfa-9073-1fbad8e146a7_large.jpg?version=1563968373784',
      imgUrlFull:
        'https://qastatic.hopscotch.in/fstatic/product/201907/6de3bbc8-7e8c-4cfa-9073-1fbad8e146a7_full.jpg?version=1563968373784',
      imgUrlThumbnail:
        'https://qastatic.hopscotch.in/fstatic/product/201907/6de3bbc8-7e8c-4cfa-9073-1fbad8e146a7_thumbnail.jpg?version=1563968373784',
      isCover: false,
      imgUrlHeight: 360,
      imgUrlWidth: 360,
      imgUrlLargeHeight: 600,
      imgUrlLargeWidth: 600,
      imgUrlFullHeight: 1000,
      imgUrlFullWidth: 1000,
      imgUrlThumbnailHeight: 70,
      imgUrlThumbnailWidth: 70,
    },
    {
      imgUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201907/14dfe7a6-9721-4923-8868-1940f584ee84_medium.jpg?version=1563968383635',
      imgUrlLarge:
        'https://qastatic.hopscotch.in/fstatic/product/201907/14dfe7a6-9721-4923-8868-1940f584ee84_large.jpg?version=1563968383635',
      imgUrlFull:
        'https://qastatic.hopscotch.in/fstatic/product/201907/14dfe7a6-9721-4923-8868-1940f584ee84_full.jpg?version=1563968383635',
      imgUrlThumbnail:
        'https://qastatic.hopscotch.in/fstatic/product/201907/14dfe7a6-9721-4923-8868-1940f584ee84_thumbnail.jpg?version=1563968383635',
      isCover: false,
      imgUrlHeight: 360,
      imgUrlWidth: 360,
      imgUrlLargeHeight: 600,
      imgUrlLargeWidth: 600,
      imgUrlFullHeight: 1000,
      imgUrlFullWidth: 1000,
      imgUrlThumbnailHeight: 70,
      imgUrlThumbnailWidth: 70,
    },
    {
      imgUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201907/21f8c817-c568-4a20-ba4f-14ebe18a51cd_medium.jpg?version=1563968393466',
      imgUrlLarge:
        'https://qastatic.hopscotch.in/fstatic/product/201907/21f8c817-c568-4a20-ba4f-14ebe18a51cd_large.jpg?version=1563968393466',
      imgUrlFull:
        'https://qastatic.hopscotch.in/fstatic/product/201907/21f8c817-c568-4a20-ba4f-14ebe18a51cd_full.jpg?version=1563968393466',
      imgUrlThumbnail:
        'https://qastatic.hopscotch.in/fstatic/product/201907/21f8c817-c568-4a20-ba4f-14ebe18a51cd_thumbnail.jpg?version=1563968393466',
      isCover: false,
      imgUrlHeight: 360,
      imgUrlWidth: 360,
      imgUrlLargeHeight: 600,
      imgUrlLargeWidth: 600,
      imgUrlFullHeight: 2085,
      imgUrlFullWidth: 2085,
      imgUrlThumbnailHeight: 70,
      imgUrlThumbnailWidth: 70,
    },
    {
      imgUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201907/5919f92f-f297-47dc-862a-9e56645a0ae9_medium.jpg?version=1563968384227',
      imgUrlLarge:
        'https://qastatic.hopscotch.in/fstatic/product/201907/5919f92f-f297-47dc-862a-9e56645a0ae9_large.jpg?version=1563968384227',
      imgUrlFull:
        'https://qastatic.hopscotch.in/fstatic/product/201907/5919f92f-f297-47dc-862a-9e56645a0ae9_full.jpg?version=1563968384227',
      imgUrlThumbnail:
        'https://qastatic.hopscotch.in/fstatic/product/201907/5919f92f-f297-47dc-862a-9e56645a0ae9_thumbnail.jpg?version=1563968384227',
      isCover: false,
      imgUrlHeight: 360,
      imgUrlWidth: 360,
      imgUrlLargeHeight: 600,
      imgUrlLargeWidth: 600,
      imgUrlFullHeight: 1000,
      imgUrlFullWidth: 1000,
      imgUrlThumbnailHeight: 70,
      imgUrlThumbnailWidth: 70,
    },
  ],
};
