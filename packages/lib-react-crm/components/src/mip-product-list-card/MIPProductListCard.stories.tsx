import React from 'react';
import {MIPProductListCard} from "./MIPProductListCard";
import { Story } from '@storybook/react/types-6-0';
import { MIPProductListCardProps } from './IMIPProductListCard';

export default {
    title : 'MIP Product Card',
    component: MIPProductListCard
}

const sampleProductData = {
    "imageUrl":"https:///static.hopscotch.in/fstatic/product/201802/b1c48ecd-4ca9-4431-9149-2c6a433089d0_full.jpg?version=1517739931850",
    "productId":203156,
    "status": "keep",
    "pidData": [
        [
            "ASV", "10"
        ],[
            "Views", "10"
        ],
        [
            "Impression", "20"
        ],
        [
            "CTR", "20"
        ],
        [
            "Conversion", "30"
        ]
    ],
    discoveryDecision: "Catalog",
    catalog: false,
}

const Template: Story<MIPProductListCardProps> = (args) =>{
    return(<MIPProductListCard {...args} />)
}

export const MIPProductListCardComponent = Template.bind({});
MIPProductListCardComponent.args = {
    ...sampleProductData
}