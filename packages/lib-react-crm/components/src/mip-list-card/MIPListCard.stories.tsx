import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import MipListCard from './MIPListCard';
import MIPListCardProps from './IMIPListCard';


export default {
    title : 'Mip MSku Table',
    component : MipListCard
};

const mipListData = {
    "imageUrl":"https:///static.hopscotch.in/fstatic/product/201802/b1c48ecd-4ca9-4431-9149-2c6a433089d0_full.jpg?version=1517739931850",
    "mskuName":"apprealchildreDressInfant400-700",
    "mskuId":591,
    "assotmentFlag":"Red",
    "mskuData": [
            [
                "TW","CW","TF","CF","TS","CS"
            ],[
                "2","60","80","90","100","23"
            ]
        ]

}

const Template : Story<MIPListCardProps> = (args) =>{
    return(<MipListCard {...args} />)
}

export const MIPListCardComponent = Template.bind({});
MIPListCardComponent.args = {
  ...mipListData,
};