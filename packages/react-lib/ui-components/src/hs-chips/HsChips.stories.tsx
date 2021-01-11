import React, { FC } from 'react';
import { HsChips } from './HsChips';
import { IHsChips } from './IHsChips';

export default {
  title: 'HsChips',
  component: HsChips,
};

const dataSet: IHsChips = {
    objectsList:[
    {
        key : 'reasons',
        options: [
            {
            display: 'Non due to quality and sizing',
            value: '1kjh',
            key: '1kjh',
            id: '1',
        }]
    },
    { 
        key: 'test',
        options: [
            { 
                display: 'terst st s etw t',
                value: 4543534,
                id: '1',
            }
        ]
    }
]
};

export const HsChipsComponent: FC = () => <HsChips {...dataSet} />;
