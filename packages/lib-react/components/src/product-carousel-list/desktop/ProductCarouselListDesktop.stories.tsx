import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { ProductCarouselListDesktop } from './ProductCarouselListDesktop';
import { IProductCarouselListProps } from '../IProductCarouselList';
export default {
  title: 'Product Carousel List Desktop',
  component: ProductCarouselListDesktop,
};

const Template: Story<IProductCarouselListProps> = (args) => (
  <ProductCarouselListDesktop {...args} />
);
export const CarouselListComponent = Template.bind({});

CarouselListComponent.args = {
  products: [
    {
      id: 950049,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202007/2c58a399-297b-43fb-9926-4dc73c868122_medium.jpg?version=1594381200206',
      productName: 'Purple Round Neck Cotton Graphic Printed T-Shirt',
      brandName: 'BCK',
      salePrice: 299,
    },
    {
      id: 911777,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201912/09692ae8-dfa7-4db2-82d8-d5a84ff29e65_medium.jpg?version=1576841446438',
      productName: 'Floral Charm Yellow Bow Hairclip',
      brandName: 'Asthetika',
      salePrice: 129,
    },
    {
      id: 797220,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201903/3dc63a6e-ec50-4786-b371-5152937080df_medium.jpg?version=1553077357640',
      productName: 'Half Sleeves Shirt With Leaf Print',
      brandName: 'PTR',
      salePrice: 799,
    },
    {
      id: 930907,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202003/d9e479aa-7450-4ba1-8ee2-93d6cfc1d527_medium.jpg?version=1583485948147',
      productName: 'Beige Bow Applique Ballerinas',
      brandName: 'AMZ',
      salePrice: 649,
    },
    {
      id: 925370,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202002/715f75fa-e58a-4aeb-82ba-eb83d2896081_medium.jpg?version=1580973969046',
      productName: 'Black And Yellow Booties',
      brandName: 'SKI',
      salePrice: 499,
    },
    {
      id: 959224,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202008/f4d46558-ac31-4ac0-9910-1e2fa76bd9cd_medium.jpg?version=1596544220262',
      productName: 'Purple Half Sleeves Floral Printed Top and Capri Set',
      brandName: 'E-WEN',
      salePrice: 961,
    },
    {
      id: 886204,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201911/fa2bf1de-ad4c-4016-849e-2cad440683de_medium.jpg?version=1574311694189',
      productName: 'Navy Boys Joggers',
      brandName: 'GBN',
      salePrice: 350,
    },
    {
      id: 949535,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202007/ffc320c5-9cbf-435c-aba3-96876dd308ef_medium.jpg?version=1594190522858',
      productName:
        'Vanilla Grey & Mustard Color Reusable 100% Cotton Face Mask for Kids (SET OF 2 pcs )',
      brandName: 'Pluchi',
      salePrice: 250,
    },
    {
      id: 948629,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202007/9a79c8d5-7bd9-4a5e-a492-71e4c8eb9aee_medium.jpg?version=1593786656326',
      productName:
        'Traditional Handcrafted Zardozi Resham Thread Work Rakhi For Brother - Gold and Red - TMW-JR-1265',
      brandName: 'CASC',
      salePrice: 179,
    },
    {
      id: 941494,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202005/eee00abd-6e3a-46e1-b018-0728f4c9b596_medium.jpg?version=1589359102949',
      productName: 'Sprouted Health Mix - Sathu Mavu - 500 g',
      brandName: 'HFC',
      salePrice: 914,
    },
    {
      id: 919132,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202001/ffe6f408-fc9f-408c-931c-7572591e595b_medium.jpg?version=1579522792006',
      productName: 'Navy Blue Floral Print Sleeveless Dress with Head Band Set',
      brandName: 'TCA',
      salePrice: 449,
    },
    {
      id: 934512,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202006/7ebbdc85-a66c-4f76-8c10-256f482e60bd_medium.jpg?version=1593428670068',
      productName: 'L.Pink Fruit Print Sleeveless Romper',
      brandName: 'MLE',
      salePrice: 445,
    },
    {
      id: 936437,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202003/e3cdcc81-1a87-4796-a47c-03c7955c2a90_medium.jpg?version=1584612967546',
      productName: 'White Unicorn Sequence Pencil Pouch',
      brandName: 'TSCC',
      salePrice: 399,
    },
    {
      id: 574026,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201710/b4dbb5fb-abb8-4172-9089-7dcde1e7d7e0_medium.jpg?version=1507809696169',
      productName: 'Horse Dreams Sidekick Backpack',
      brandName: 'wid',
      salePrice: 3049,
    },
    {
      id: 929352,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202002/69eec5e4-1ea3-432e-b2b8-4824730cdca3_medium.jpg?version=1582703555777',
      productName: 'VPK - Grey Melange Lace Girls Top',
      brandName: 'WHAO',
      salePrice: 299,
    },
    {
      id: 901589,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201911/66c670e9-fd2c-4997-994d-16e91dc8e737_medium.jpg?version=1574962294970',
      productName: 'Chic Brown N Cream Scarf Band',
      brandName: 'TIA',
      salePrice: 199,
    },
    {
      id: 665087,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201806/74f108ab-5f49-4914-b130-f62d28503391_medium.png?version=1528096587674',
      productName: 'Storage Bin - Duck',
      brandName: 'SUM',
      salePrice: 875,
    },
    {
      id: 956959,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202007/609bc35d-78fc-4feb-8e67-7a0f178f2190_medium.jpg?version=1595834862338',
      productName: 'Pink Animal Applique Half Sleeve Jumpsuit',
      brandName: 'Lil Pic',
      salePrice: 899,
    },
    {
      id: 937327,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202006/97e013c7-bbf4-4c7c-b18b-137a50525c1b_medium.jpg?version=1592818911210',
      productName: 'Beige Floral Print Sleeveless Kurta And Dhoti Set',
      brandName: 'JJC',
      salePrice: 1399,
    },
    {
      id: 923374,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202001/9e98aefd-fbc3-4326-bea6-291ea559b0f9_medium.jpg?version=1580383384094',
      productName: 'L.Green Dinosaur Print Half Sleeve T-Shirt',
      brandName: 'OJO',
      salePrice: 260,
    },
    {
      id: 947678,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202007/33f2dc19-7e50-47c8-b9ca-4bef74a5d2ad_medium.jpg?version=1595913709334',
      productName: 'Yellow Checks Print Short Set',
      brandName: 'JBC',
      salePrice: 470,
    },
    {
      id: 943109,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202006/677e9316-2b37-494b-b8b1-eaf6119c1686_medium.jpg?version=1591246455339',
      productName: 'Fisher-Price Newborn to Toddler Play Gym, Multi Color',
      brandName: 'FIP',
      salePrice: 5499,
    },
    {
      id: 932733,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202003/34af88b7-d45e-42db-b56a-8c279e9c50ba_medium.jpg?version=1583915433349',
      productName: 'White Love cats Printed Swim suit',
      brandName: 'LLT',
      salePrice: 599,
    },
    {
      id: 928096,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202003/8dedc7bb-3583-4991-bb2e-48f7fa8a244c_medium.jpg?version=1583302594322',
      productName: 'Light Pink Cat Ears Set',
      brandName: 'BOTA',
      salePrice: 199,
    },
    {
      id: 844773,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201906/db11b6d7-6944-4fac-9d8b-5eaf46e21ab0_medium.jpg?version=1561462715293',
      productName:
        'Floral Print 3/4th Sleeves White Kurta With Pink Sharara Set',
      brandName: 'PS',
      salePrice: 2249,
    },
    {
      id: 814210,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201907/2d12aa3a-6e71-4401-bf16-be4f5c585b49_medium.jpg?version=1563876427470',
      productName:
        'Solid Full Sleeves Shirt Navy Blue Suspender Pant with Shirt and Cap Set',
      brandName: 'JJC',
      salePrice: 1178,
    },
    {
      id: 926844,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202003/bc1f2614-06fe-49ee-856e-46693b413588_medium.jpg?version=1583228840425',
      productName: 'Purple Text Print Half Sleeve T-Shirt',
      brandName: 'LAZY',
      salePrice: 315,
    },
    {
      id: 954022,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202007/5190d709-ee2f-4de4-bcbc-5c9833da68e2_medium.jpg?version=1595839443325',
      productName: 'Red and White Printed Checks Flared Dress',
      brandName: 'TMW',
      salePrice: 799,
    },
    {
      id: 924245,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202001/78899ac5-cc05-40bf-9511-53604f5d1df8_medium.jpg?version=1580380667041',
      productName: 'Combo - Black I Love You Matching Dad & Daughter Tees',
      brandName: 'BON',
      salePrice: 998,
    },
    {
      id: 959570,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202008/dcbca6f3-5592-4286-bf3a-78fe14053358_medium.jpg?version=1596511981913',
      productName: 'Orange Full Sleeves Text Printed Sweater and Pant Set',
      brandName: 'Yezai',
      salePrice: 1295,
    },
  ],
  section: 'RFYP',
  subsection: 'Carousel',
};
