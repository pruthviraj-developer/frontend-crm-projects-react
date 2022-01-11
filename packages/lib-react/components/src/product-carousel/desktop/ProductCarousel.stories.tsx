import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { ProductCarouselDesktop } from './ProductCarouselDesktop';
import { IProductCarouselDesktopProps } from './IProductCarouselDesktop';
export default {
  title: 'Carousel Desktop',
  component: ProductCarouselDesktop,
};

const Template: Story<IProductCarouselDesktopProps> = (args) => (
  <ProductCarouselDesktop {...args} />
);
export const CarouselDesktop = Template.bind({});

CarouselDesktop.args = {
  showArrows: false,
  autoPlay: true,
  draggable: false,
  focusOnSelect: false,
  renderButtonGroupOutside: false,
  renderDotsOutside: false,
  slidesToSlide: 1,
  swipeable: false,
  showDots: false,
  imgUrls: [
    {
      imgUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202005/7d62558e-e715-4aa5-afc8-ecb3f05bc0da_medium.jpg?version=1590558372330',
      imgUrlLarge:
        'https://qastatic.hopscotch.in/fstatic/product/202005/7d62558e-e715-4aa5-afc8-ecb3f05bc0da_large.jpg?version=1590558372330',
      imgUrlFull:
        'https://qastatic.hopscotch.in/fstatic/product/202005/7d62558e-e715-4aa5-afc8-ecb3f05bc0da_full.jpg?version=1590558372330',
      imgUrlThumbnail:
        'https://qastatic.hopscotch.in/fstatic/product/202005/7d62558e-e715-4aa5-afc8-ecb3f05bc0da_thumbnail.jpg?version=1590558372330',
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
        'https://qastatic.hopscotch.in/fstatic/product/202005/8ae0b679-089f-41ad-8a10-0e104943a125_medium.jpg?version=1590558373138',
      imgUrlLarge:
        'https://qastatic.hopscotch.in/fstatic/product/202005/8ae0b679-089f-41ad-8a10-0e104943a125_large.jpg?version=1590558373138',
      imgUrlFull:
        'https://qastatic.hopscotch.in/fstatic/product/202005/8ae0b679-089f-41ad-8a10-0e104943a125_full.jpg?version=1590558373138',
      imgUrlThumbnail:
        'https://qastatic.hopscotch.in/fstatic/product/202005/8ae0b679-089f-41ad-8a10-0e104943a125_thumbnail.jpg?version=1590558373138',
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
        'https://qastatic.hopscotch.in/fstatic/product/202005/d95658d3-acb4-42ce-a452-f31fe1f91101_medium.jpg?version=1590558374064',
      imgUrlLarge:
        'https://qastatic.hopscotch.in/fstatic/product/202005/d95658d3-acb4-42ce-a452-f31fe1f91101_large.jpg?version=1590558374064',
      imgUrlFull:
        'https://qastatic.hopscotch.in/fstatic/product/202005/d95658d3-acb4-42ce-a452-f31fe1f91101_full.jpg?version=1590558374064',
      imgUrlThumbnail:
        'https://qastatic.hopscotch.in/fstatic/product/202005/d95658d3-acb4-42ce-a452-f31fe1f91101_thumbnail.jpg?version=1590558374064',
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
        'https://qastatic.hopscotch.in/fstatic/product/202005/599a7072-9464-4c75-90bf-e33be5e15968_medium.jpg?version=1590558374813',
      imgUrlLarge:
        'https://qastatic.hopscotch.in/fstatic/product/202005/599a7072-9464-4c75-90bf-e33be5e15968_large.jpg?version=1590558374813',
      imgUrlFull:
        'https://qastatic.hopscotch.in/fstatic/product/202005/599a7072-9464-4c75-90bf-e33be5e15968_full.jpg?version=1590558374813',
      imgUrlThumbnail:
        'https://qastatic.hopscotch.in/fstatic/product/202005/599a7072-9464-4c75-90bf-e33be5e15968_thumbnail.jpg?version=1590558374813',
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
        'https://qastatic.hopscotch.in/fstatic/product/202005/ef24d17f-669d-418e-869f-ee8a473bfabe_medium.jpg?version=1590558375569',
      imgUrlLarge:
        'https://qastatic.hopscotch.in/fstatic/product/202005/ef24d17f-669d-418e-869f-ee8a473bfabe_large.jpg?version=1590558375569',
      imgUrlFull:
        'https://qastatic.hopscotch.in/fstatic/product/202005/ef24d17f-669d-418e-869f-ee8a473bfabe_full.jpg?version=1590558375569',
      imgUrlThumbnail:
        'https://qastatic.hopscotch.in/fstatic/product/202005/ef24d17f-669d-418e-869f-ee8a473bfabe_thumbnail.jpg?version=1590558375569',
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
        'https://qastatic.hopscotch.in/fstatic/product/202005/9bcb1bd7-23aa-401a-8c5d-85f33cd133db_medium.jpg?version=1590558376284',
      imgUrlLarge:
        'https://qastatic.hopscotch.in/fstatic/product/202005/9bcb1bd7-23aa-401a-8c5d-85f33cd133db_large.jpg?version=1590558376284',
      imgUrlFull:
        'https://qastatic.hopscotch.in/fstatic/product/202005/9bcb1bd7-23aa-401a-8c5d-85f33cd133db_full.jpg?version=1590558376284',
      imgUrlThumbnail:
        'https://qastatic.hopscotch.in/fstatic/product/202005/9bcb1bd7-23aa-401a-8c5d-85f33cd133db_thumbnail.jpg?version=1590558376284',
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
        'https://qastatic.hopscotch.in/fstatic/product/202005/bbfffe13-9403-42eb-9a74-20829d160377_medium.jpg?version=1590558377079',
      imgUrlLarge:
        'https://qastatic.hopscotch.in/fstatic/product/202005/bbfffe13-9403-42eb-9a74-20829d160377_large.jpg?version=1590558377079',
      imgUrlFull:
        'https://qastatic.hopscotch.in/fstatic/product/202005/bbfffe13-9403-42eb-9a74-20829d160377_full.jpg?version=1590558377079',
      imgUrlThumbnail:
        'https://qastatic.hopscotch.in/fstatic/product/202005/bbfffe13-9403-42eb-9a74-20829d160377_thumbnail.jpg?version=1590558377079',
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
        'https://qastatic.hopscotch.in/fstatic/product/202005/f9b39cac-a4d8-408f-a44b-c0e58adb4161_medium.jpg?version=1590558377819',
      imgUrlLarge:
        'https://qastatic.hopscotch.in/fstatic/product/202005/f9b39cac-a4d8-408f-a44b-c0e58adb4161_large.jpg?version=1590558377819',
      imgUrlFull:
        'https://qastatic.hopscotch.in/fstatic/product/202005/f9b39cac-a4d8-408f-a44b-c0e58adb4161_full.jpg?version=1590558377819',
      imgUrlThumbnail:
        'https://qastatic.hopscotch.in/fstatic/product/202005/f9b39cac-a4d8-408f-a44b-c0e58adb4161_thumbnail.jpg?version=1590558377819',
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
        'https://qastatic.hopscotch.in/fstatic/product/202005/e290b0dc-be27-4491-b121-769f43133cd6_medium.jpg?version=1590558378628',
      imgUrlLarge:
        'https://qastatic.hopscotch.in/fstatic/product/202005/e290b0dc-be27-4491-b121-769f43133cd6_large.jpg?version=1590558378628',
      imgUrlFull:
        'https://qastatic.hopscotch.in/fstatic/product/202005/e290b0dc-be27-4491-b121-769f43133cd6_full.jpg?version=1590558378628',
      imgUrlThumbnail:
        'https://qastatic.hopscotch.in/fstatic/product/202005/e290b0dc-be27-4491-b121-769f43133cd6_thumbnail.jpg?version=1590558378628',
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
