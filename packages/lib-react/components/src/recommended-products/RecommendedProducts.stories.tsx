import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IRecommendedProductsProps } from './IRecommendedProducts';
import { RecommendedProducts } from './RecommendedProducts';

export default {
  title: 'Recommended Products',
  component: RecommendedProducts,
};

const Template: Story<IRecommendedProductsProps> = (args) => (
  <RecommendedProducts {...args} />
);
export const DetailsComponent = Template.bind({});

DetailsComponent.args = {
  section: ' section success',
  showmatching: true,
  id: 'propductdetails',
  pid: '394827',
  recommended: {
    title: 'RC1 PPVar2 Random',
    details: [
      {
        id: 943009,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/202006/0611868e-51a4-4177-858d-80b1b6b2b58d_medium.jpg?version=1591230092585',
        productName: "Creative Sketchbook - Marinia's",
        brandName: 'NBLS',
        salePrice: 1499.0,
      },
      {
        id: 926391,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/202002/90b6a752-e0b1-4715-9eec-489f58808bfd_medium.jpg?version=1582009410676',
        productName: 'Black Bow Applique Half Party Dress',
        brandName: 'My Pink Closet',
        salePrice: 989.0,
      },
      {
        id: 948335,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/202007/07142d63-23f0-4cc7-b297-3ddf64e84960_medium.jpg?version=1595071099789',
        productName: 'Solid Red Leggings',
        brandName: 'cray',
        salePrice: 299.0,
      },
      {
        id: 955598,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/202007/364adef5-8321-4ccb-bfc6-1e32bf1df688_medium.jpg?version=1595514865832',
        productName: 'Heart All Over Tic-tac Clips',
        brandName: 'ECD',
        salePrice: 189.0,
      },
      {
        id: 942525,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/202006/61af4da4-a2f6-4a49-8fd8-7af9dac59a49_medium.jpg?version=1591233866517',
        productName:
          'Kids Spy Goggles Night Vision - See In The Dark With Powerful Green Led',
        brandName: 'DISC',
        salePrice: 1260.0,
      },
      {
        id: 954409,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/202007/154e483c-6a49-471d-80dd-04f3dd8c8b0b_medium.jpg?version=1595423869432',
        productName: 'Green Fancy Aviator Sunglass Mercury Shade',
        brandName: 'AAD',
        salePrice: 549.0,
      },
      {
        id: 937327,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/202006/97e013c7-bbf4-4c7c-b18b-137a50525c1b_medium.jpg?version=1592818911210',
        productName: 'Beige Floral Print Sleeveless Kurta And Dhoti Set',
        brandName: 'JJC',
        salePrice: 1399.0,
      },
      {
        id: 859463,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/201908/0cc43eb1-0d61-4609-b02e-6b92c08be9ae_medium.jpg?version=1566815332827',
        productName: 'Black Graphic Print Full Sleeves T-Shirt ',
        brandName: 'BKZ',
        salePrice: 220.0,
      },
      {
        id: 801378,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/201904/30a0946a-d933-4b5c-8885-3b332973701e_medium.jpg?version=1554202631284',
        productName: 'Orange Dhoti Kurta Set',
        brandName: 'JJC',
        salePrice: 1150.0,
      },
      {
        id: 797220,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/201903/3dc63a6e-ec50-4786-b371-5152937080df_medium.jpg?version=1553077357640',
        productName: 'Half Sleeves Shirt With Leaf Print',
        brandName: 'PTR',
        salePrice: 799.0,
      },
      {
        id: 950049,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/202007/2c58a399-297b-43fb-9926-4dc73c868122_medium.jpg?version=1594381200206',
        productName: 'Purple Round Neck Cotton Graphic Printed T-Shirt',
        brandName: 'BCK',
        salePrice: 299.0,
      },
      {
        id: 897423,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/201911/bc240b60-40e5-41d3-a85d-6b61f31a0362_medium.jpg?version=1573893538392',
        productName: 'Black Sequins Embellished Sneakers',
        brandName: 'FWS',
        salePrice: 699.0,
      },
      {
        id: 905806,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/201912/485e45e2-d40b-4f06-a9b9-989c14c19252_medium.jpg?version=1576133423922',
        productName: 'Yellow Peeping Rabbit Thick Fleece Sweatshirt',
        brandName: "M'ANDY",
        salePrice: 749.0,
      },
      {
        id: 715495,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/201809/602ae8b4-5a91-4923-9882-b30c0e7a0a4b_medium.jpg?version=1538110846215',
        productName: 'Trendy Sequin Shrug-Red',
        brandName: 'SFY',
        salePrice: 799.0,
      },
      {
        id: 242449,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/201601/46079dd7-c2c6-45e4-865e-7980ee3d7eff_medium.jpg?version=1452677325650',
        productName: 'Paddlepak Clown Fish',
        brandName: 'TRU',
        salePrice: 1799.0,
      },
      {
        id: 959224,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/202008/f4d46558-ac31-4ac0-9910-1e2fa76bd9cd_medium.jpg?version=1596544220262',
        productName: 'Purple Half Sleeves Floral Printed Top and Capri Set',
        brandName: 'E-WEN',
        salePrice: 961.0,
      },
      {
        id: 901589,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/201911/66c670e9-fd2c-4997-994d-16e91dc8e737_medium.jpg?version=1574962294970',
        productName: 'Chic Brown N Cream Scarf Band',
        brandName: 'TIA',
        salePrice: 199.0,
      },
      {
        id: 945056,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/202006/238d3f3e-1748-4ed9-a04b-eae6221d8655_medium.jpg?version=1592994804063',
        productName:
          'Multi All over Printed Mercerised Footie  With Rib Around Neck 4',
        brandName: 'PRN',
        salePrice: 345.0,
      },
      {
        id: 925370,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/202002/715f75fa-e58a-4aeb-82ba-eb83d2896081_medium.jpg?version=1580973969046',
        productName: 'Black And Yellow Booties',
        brandName: 'SKI',
        salePrice: 499.0,
      },
      {
        id: 767082,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/201902/e2c2ecf6-209d-4564-9018-aae8556fe4ed_medium.jpg?version=1549967515932',
        productName: 'Ventilated Symmetric Silicone Soother Blue : 0-6 months',
        brandName: 'P U R',
        salePrice: 199.0,
      },
      {
        id: 933186,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/202006/7eb8c043-ef37-4e73-ba6f-4985c3fc5b23_medium.jpg?version=1592213592179',
        productName: 'Black Heart Printed T-Shirt',
        brandName: 'NSMD',
        salePrice: 475.0,
      },
      {
        id: 933219,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/202006/5cbe5f54-606f-47cb-9afc-7e81b3509b7d_medium.jpg?version=1593445027314',
        productName: 'Grape Rose Sequins Top',
        brandName: 'VTM',
        salePrice: 799.0,
      },
      {
        id: 933182,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/202006/b128219a-3894-4106-a0e8-ae0a251e6d41_medium.jpg?version=1592213178284',
        productName: 'White Cinderella Girl Print T-Shirt',
        brandName: 'NSMD',
        salePrice: 420.0,
      },
      {
        id: 574026,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/201710/b4dbb5fb-abb8-4172-9089-7dcde1e7d7e0_medium.jpg?version=1507809696169',
        productName: 'Horse Dreams Sidekick Backpack',
        brandName: 'wid',
        salePrice: 3049.0,
      },
      {
        id: 946579,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/202006/2698f13a-9103-45b3-9b94-89734af30f8a_medium.jpg?version=1592894028000',
        productName: 'Blue Embroidery Printed  Kurta Set',
        brandName: 'BBBH',
        salePrice: 987.0,
      },
      {
        id: 939218,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/202005/ce0d5fea-01dd-4eed-89a6-bcd07889ee77_medium.jpg?version=1590577502999',
        productName:
          'Bye Bye Dark Circles, Under Eye Cream For Dark Circles, With Cucumber & Peptides - 20ml',
        brandName: 'MAE',
        salePrice: 399.0,
      },
      {
        id: 952746,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/202007/67b44762-d47e-422e-b3d9-b7d454171d56_medium.jpg?version=1594732438456',
        productName:
          'Twinkle Collection 100% Cotton Soft Muslin Swaddles Wrap- Pack of 2 (100 x 100 cm, Navy, Dots)',
        brandName: 'HUKI',
        salePrice: 529.0,
      },
      {
        id: 797760,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/201903/db6f511d-97f0-4316-8665-8e4a36cea624_medium.jpg?version=1552656461909',
        productName: 'Solid Navy Blue Full Sleeves Dhoti Kurta Set',
        brandName: 'JJC',
        salePrice: 833.0,
      },
      {
        id: 406496,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/201608/d176ed8c-fad5-4aa4-947f-7fcff93c5dd6_medium.jpg?version=1472117029597',
        productName: 'Handpainted Wooden Napkin Holder With Madhubani Art',
        brandName: 'Exclusivelane',
        salePrice: 1599.0,
      },
      {
        id: 916997,
        imageUrl:
          'https://qastatic.hopscotch.in/fstatic/product/202001/f6050ec2-4592-49b6-989b-764e1346c4e7_medium.jpg?version=1578306710020',
        productName: 'Gold Floral Applique Booties',
        brandName: 'BUBB',
        salePrice: 299.0,
      },
    ],
    matching: [
      {
        name: 'More Dresses from Princes & Princesses',
        searchParams: {
          subCategorys: 444,
          brandId: 14945,
          filterQuery: 'subCategorys=444&brandId=14945',
        },
        recoType: 'More Recommendations',
        screenName: 'More Dresses from Princes & Princesses',
      },
      {
        name: 'More Multi Dresses',
        searchParams: {
          subCategorys: 444,
          colour: 'Multi',
          filterQuery: 'subCategorys=444&colour=Multi',
        },
        recoType: 'More Recommendations',
        screenName: 'More Multi Dresses',
      },
      {
        name: 'More Dresses',
        searchParams: {
          subCategorys: 444,
          filterQuery: 'subCategorys=444',
        },
        recoType: 'More Recommendations',
        screenName: 'More Dresses',
      },
    ],
  },
};
