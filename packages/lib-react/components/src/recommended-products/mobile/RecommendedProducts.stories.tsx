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
  section: 'RFYP',
  subsection: 'Carousel',
  id: 'similarproducts',
  pid: '406496',
  showmatching: true,
  products: [
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
      id: 695400,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201808/07419467-2ad3-4fc1-bbc1-8f0f5e777c95_medium.jpg?version=1533105958717',
      productName: 'Blue Cartoon Face Print Dungaree and Top Set',
      brandName: 'FASHION',
      salePrice: 771,
    },
    {
      id: 931236,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202003/e87a2130-6160-428c-9135-c85b92c4c921_medium.jpg?version=1583385988889',
      productName: 'Black Baby Sleeveless Frock Set',
      brandName: 'Fcare',
      salePrice: 449,
    },
    {
      id: 859463,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201908/0cc43eb1-0d61-4609-b02e-6b92c08be9ae_medium.jpg?version=1566815332827',
      productName: 'Black Graphic Print Full Sleeves T-Shirt ',
      brandName: 'BKZ',
      salePrice: 220,
    },
    {
      id: 883662,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201911/790f56a2-9fee-458c-ba88-22a6e8db921e_medium.jpg?version=1573726073141',
      productName: 'Brown Stripe Jacket& Pajama Set',
      brandName: 'KDY',
      salePrice: 750,
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
      id: 925370,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202002/715f75fa-e58a-4aeb-82ba-eb83d2896081_medium.jpg?version=1580973969046',
      productName: 'Black And Yellow Booties',
      brandName: 'SKI',
      salePrice: 499,
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
      id: 848529,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201907/451ea5c5-4732-4d44-a4fc-6c6e9ef853e7_medium.jpg?version=1563194581539',
      productName: 'Slub Cotton Full Sleeve Kanhaiya Suit- Green',
      brandName: 'Bown',
      salePrice: 699,
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
      id: 936847,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202006/a4063fda-acd0-438c-adad-65a1f25aaa10_medium.jpg?version=1592202524811',
      productName: 'White Robot Print Half Sleeves T-Shirt',
      brandName: "M'ANDY",
      salePrice: 399,
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
      id: 797220,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201903/3dc63a6e-ec50-4786-b371-5152937080df_medium.jpg?version=1553077357640',
      productName: 'Half Sleeves Shirt With Leaf Print',
      brandName: 'PTR',
      salePrice: 799,
    },
    {
      id: 945394,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202006/361e0a03-585a-4c98-bafd-36a5e8968eb5_medium.jpg?version=1592479578376',
      productName: 'Happy Birthday Doll',
      brandName: 'BAR',
      salePrice: 999,
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
      id: 665087,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201806/74f108ab-5f49-4914-b130-f62d28503391_medium.png?version=1528096587674',
      productName: 'Storage Bin - Duck',
      brandName: 'SUM',
      salePrice: 875,
    },
    {
      id: 118262,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201706/b7e4fdc7-1749-47b1-8c8b-55b5c79eae05_medium.jpg?version=1496314553209',
      productName: 'Light Orange And Camel Cushy Thong Slippers',
      brandName: 'Beanz',
      salePrice: 1499,
    },
    {
      id: 924931,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202002/005225da-b2ae-4215-8c26-abaf7d2f6000_medium.jpg?version=1582114822686',
      productName: 'Blue Boys Bat Printed Jogger',
      brandName: 'GBN',
      salePrice: 268,
    },
    {
      id: 946579,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202006/2698f13a-9103-45b3-9b94-89734af30f8a_medium.jpg?version=1592894028000',
      productName: 'Blue Embroidery Printed  Kurta Set',
      brandName: 'BBBH',
      salePrice: 987,
    },
    {
      id: 928523,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202002/dbe49c84-6d23-4cbb-bfca-0a1eedde45cc_medium.jpg?version=1582804039218',
      productName: 'Graphic Print Half Sleeves T-Shirt ',
      brandName: 'TW2',
      salePrice: 399,
    },
    {
      id: 943668,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202006/2752982c-8295-4fdf-885d-6dba61977992_medium.jpg?version=1591857642155',
      productName: 'White All Over Print Sleeveless Half Romper',
      brandName: 'NIB',
      salePrice: 599,
    },
    {
      id: 242449,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201601/46079dd7-c2c6-45e4-865e-7980ee3d7eff_medium.jpg?version=1452677325650',
      productName: 'Paddlepak Clown Fish',
      brandName: 'TRU',
      salePrice: 1799,
    },
    {
      id: 948027,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202007/09f22535-d6bc-47f1-a039-db3f62d4da00_medium.jpg?version=1594979525250',
      productName:
        '100% Natural Multigrain Snack - Protein Puffs - Pizza Party - Pack of 6 (60gm x 6)',
      brandName: 'MCO',
      salePrice: 360,
    },
    {
      id: 954589,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202007/5f730b16-69cb-431e-8e0b-511cda446d57_medium.jpg?version=1595330504758',
      productName: 'Off White Floral Print Sleeveless Dress',
      brandName: 'Budding Bees',
      salePrice: 850,
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
      id: 801378,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201904/30a0946a-d933-4b5c-8885-3b332973701e_medium.jpg?version=1554202631284',
      productName: 'Orange Dhoti Kurta Set',
      brandName: 'JJC',
      salePrice: 1150,
    },
    {
      id: 242860,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201601/e7684125-22af-45e9-9746-c8683459b65b_medium.jpg?version=1452601416910',
      productName: 'Multi Stripes Slip-On Shoes ',
      brandName: 'Carter-s',
      salePrice: 769,
    },
    {
      id: 767082,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/201902/e2c2ecf6-209d-4564-9018-aae8556fe4ed_medium.jpg?version=1549967515932',
      productName: 'Ventilated Symmetric Silicone Soother Blue : 0-6 months',
      brandName: 'P U R',
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
      id: 938256,
      imageUrl:
        'https://qastatic.hopscotch.in/fstatic/product/202003/53c76121-e47f-4b42-ba90-f1a2fa417ff8_medium.jpg?version=1585057437050',
      productName: 'Provence Cascade Dress',
      brandName: 'ALF',
      salePrice: 2872,
    },
  ],
  matching: [
    {
      name: 'More Multi Kitchen Organizers',
      searchParams: {
        subCategorys: 757,
        colour: 'Multi',
        filterQuery: 'subCategorys=757&colour=Multi',
      },
      recoType: 'More Recommendations',
      screenName: 'More Multi Kitchen Organizers',
    },
    {
      name: 'More Kitchen Organizers',
      searchParams: { subCategorys: 757, filterQuery: 'subCategorys=757' },
      recoType: 'More Recommendations',
      screenName: 'More Kitchen Organizers',
    },
  ],
  title: 'RC1 PPVar2 Random',
};
