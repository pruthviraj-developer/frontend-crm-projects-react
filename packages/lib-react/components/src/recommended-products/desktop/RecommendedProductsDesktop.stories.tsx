import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IRecommendedProductsProps } from './../IRecommendedProducts';
import { RecommendedProductsDesktop } from './RecommendedProductsDesktop';

export default {
  title: 'Desktop Recommended Products',
  component: RecommendedProductsDesktop,
};

const Template: Story<IRecommendedProductsProps> = (args) => (
  <RecommendedProductsDesktop {...args} />
);
export const DetailsComponent = Template.bind({});

DetailsComponent.args = {
  section: 'RFYP',
  subsection: 'Carousel',
  id: 'similarproducts',
  pid: '942343',
  showmatching: true,
  products: [
    {
      id: 924931,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202002/005225da-b2ae-4215-8c26-abaf7d2f6000_medium.jpg?version=1582114822686',
      productName: 'Blue Boys Bat Printed Jogger',
      brandName: 'GBN',
      salePrice: 268,
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
      id: 924245,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202001/78899ac5-cc05-40bf-9511-53604f5d1df8_medium.jpg?version=1580380667041',
      productName: 'Combo - Black I Love You Matching Dad & Daughter Tees',
      brandName: 'BON',
      salePrice: 998,
    },
    {
      id: 945056,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202006/238d3f3e-1748-4ed9-a04b-eae6221d8655_medium.jpg?version=1592994804063',
      productName:
        'Multi All over Printed Mercerised Footie  With Rib Around Neck 4',
      brandName: 'PRN',
      salePrice: 345,
    },
    {
      id: 886827,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201910/efc604af-db48-47e8-a41a-d3fb97e17565_medium.jpg?version=1572517486391',
      productName: 'Full Sleeves Sweatshirt-Navy',
      brandName: 'BUBB',
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
      id: 897423,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201911/bc240b60-40e5-41d3-a85d-6b61f31a0362_medium.jpg?version=1573893538392',
      productName: 'Black Sequins Embellished Sneakers',
      brandName: 'FWS',
      salePrice: 699,
    },
    {
      id: 901519,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201911/b580b777-1667-4d32-b5cf-767eb98addba_medium.jpg?version=1574912397977',
      productName: 'Red Knitted Heart Pom Pom Beanie Cap and Scarf',
      brandName: 'YWB',
      salePrice: 799,
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
      id: 922273,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202001/624eefa8-349e-4a18-a1a5-42fce2fafe1d_medium.jpg?version=1580196639121',
      productName: 'Red Doll Applique Cap',
      brandName: 'BUBB',
      salePrice: 249,
    },
    {
      id: 933182,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202006/b128219a-3894-4106-a0e8-ae0a251e6d41_medium.jpg?version=1592213178284',
      productName: 'White Cinderella Girl Print T-Shirt',
      brandName: 'NSMD',
      salePrice: 420,
    },
    {
      id: 929339,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202002/efbf0d08-babd-454f-a852-cf341e421350_medium.jpg?version=1582702774236',
      productName: 'VPK - Black Summer Print Girls Top',
      brandName: 'WHAO',
      salePrice: 299,
    },
    {
      id: 865748,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201908/3b70cd52-343d-4c96-ab18-fdbdc1b6f6ea_medium.jpg?version=1566995576162',
      productName: 'Blue Cat Applique Slip Ons',
      brandName: 'KS',
      salePrice: 799,
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
      id: 901025,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201911/118ef179-d717-41fb-bb80-f991fed46650_medium.jpg?version=1574837690119',
      productName: 'Pink Slip On Shoes',
      brandName: 'KS',
      salePrice: 499,
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
      id: 948732,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202007/05459591-06cf-4602-909f-35ea6205456b_medium.jpg?version=1595244333681',
      productName: 'Red Blooming Flower Pretty Dress',
      brandName: 'TMW',
      salePrice: 525,
    },
    {
      id: 956977,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202007/4666fc06-3c8e-4ab5-b949-0747ee392fb2_medium.jpg?version=1595855638554',
      productName: 'Green Floral Print Sleeveless Dress',
      brandName: 'Lil Pic',
      salePrice: 399,
    },
    {
      id: 916081,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202002/151fb3f2-3e55-44fa-82ba-c7175f005ba7_medium.jpg?version=1580795556481',
      productName: 'Pink LED Sneaker',
      brandName: 'KS',
      salePrice: 1899,
    },
    {
      id: 769596,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201904/55fad1e3-e700-42dd-a931-5c7df32c4eb6_medium.jpg?version=1554294039199',
      productName: 'Candy Tik Tac Clip- Skinny',
      brandName: 'YWMA',
      salePrice: 222,
    },
    {
      id: 905806,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201912/485e45e2-d40b-4f06-a9b9-989c14c19252_medium.jpg?version=1576133423922',
      productName: 'Yellow Peeping Rabbit Thick Fleece Sweatshirt',
      brandName: "M'ANDY",
      salePrice: 749,
    },
    {
      id: 943009,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202006/0611868e-51a4-4177-858d-80b1b6b2b58d_medium.jpg?version=1591230092585',
      productName: "Creative Sketchbook - Marinia's",
      brandName: 'NBLS',
      salePrice: 1499,
    },
    {
      id: 848529,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201907/451ea5c5-4732-4d44-a4fc-6c6e9ef853e7_medium.jpg?version=1563194581539',
      productName: 'Slub Cotton Full Sleeve Kanhaiya Suit- Green',
      brandName: 'Bown',
      salePrice: 699,
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
      id: 936847,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202006/a4063fda-acd0-438c-adad-65a1f25aaa10_medium.jpg?version=1592202524811',
      productName: 'White Robot Print Half Sleeves T-Shirt',
      brandName: "M'ANDY",
      salePrice: 399,
    },
    {
      id: 951741,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202007/a75f3c6e-e2e6-4510-962f-03b5058a6d82_medium.jpg?version=1594355310190',
      productName: 'White Flower Pattern Velcro Mary Jane',
      brandName: 'AMZ',
      salePrice: 699,
    },
    {
      id: 920150,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202001/bf02f727-3cc2-4f46-a909-9b13f5384518_medium.jpg?version=1579684373877',
      productName: 'White Bicycle Print Half Sleeves T-Shirt',
      brandName: 'RKD',
      salePrice: 399,
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
      id: 942525,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202006/61af4da4-a2f6-4a49-8fd8-7af9dac59a49_medium.jpg?version=1591233866517',
      productName:
        'Kids Spy Goggles Night Vision - See In The Dark With Powerful Green Led',
      brandName: 'DISC',
      salePrice: 1260,
    },
    {
      id: 926391,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202002/90b6a752-e0b1-4715-9eec-489f58808bfd_medium.jpg?version=1582009410676',
      productName: 'Black Bow Applique Half Party Dress',
      brandName: 'My Pink Closet',
      salePrice: 989,
    },
  ],
  matching: [
    {
      name: 'More Pink Value Packs',
      searchParams: {
        subCategorys: 872,
        colour: 'Pink',
        filterQuery: 'subCategorys=872&colour=Pink',
      },
      recoType: 'More Recommendations',
      screenName: 'More Pink Value Packs',
    },
    {
      name: 'More Value Packs',
      searchParams: { subCategorys: 872, filterQuery: 'subCategorys=872' },
      recoType: 'More Recommendations',
      screenName: 'More Value Packs',
    },
  ],
  title: 'RC1 PPVar2 Random',
};
