import React from 'react';
import {MipMskuTable} from "./MipMskuTable";
import { Story } from '@storybook/react/types-6-0';
import MipMskuTableProps from './IMipMskuTable';

export default {
    title : 'Mip MSku Table',
    component : MipMskuTable
};

const tableDataDummyData = {
        tableData: [
            [
                "TW","CW","TF","CF","TS","CS"
            ],[
                "2","60","80","90","100","23"
            ]
        ]
    
}

const tableDataDummyData2 = {
        tableData: [
            [
                "TW","CW","TF","CF","TS","CS"
            ],[
                "2","60","80","90","100","23"
            ],
            [
                "1","60","80","90","100","23"
            ],
            [
                "3","60","80","90","100","23"
            ],
            [
                "5","60","80","90","100","23"
            ]
        ],
        accordian: true,
        accordianCount: 2,
    
};

const Template: Story<MipMskuTableProps> = (args) => {
    return(<MipMskuTable {...args} />)
}
;

export const MipMskuTableComponent = Template.bind({});
MipMskuTableComponent.args = {
  ...tableDataDummyData2,
};
