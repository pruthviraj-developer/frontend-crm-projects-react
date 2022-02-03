import React, { FC } from 'react';
import { HsChips } from './HsChips';
import { IHsChips } from './IHsChips';
import { Story } from '@storybook/react/types-6-0';

export default {
  title: 'HsChips',
  component: HsChips,
};

const dataSet: IHsChips = {
  objectsList: [
    {
      key: 'reasons',
      options: [
        {
          display: 'Non due to quality and sizing',
          value: '1kjh',
          key: '1kjh',
          id: '1',
        },
        {
          display: 'Non due to quality and sizing 1',
          value: 'werueiorwe',
          key: 'kjhn',
          id: '2',
        },
        {
          display: 'Non due to quality and sizing 3',
          value: 'werueiorwsdae',
          key: 'kjsdsd',
          id: '3',
        },
      ],
    },
    {
      key: 'test',
      options: [
        {
          display: 'terst st s etw t 1',
          value: 4543534,
          id: '1',
        },
        {
          display: 'terst st s etw t 2',
          value: 454367,
          id: '2',
        },
        {
          display: 'terst st s etw t 3',
          value: 459877,
          id: '3',
        },
      ],
    },
  ],
};

// export const HsChipsComponent: FC = () => <HsChips {...dataSet} />;

const Template: Story<IHsChips> = (args) => <HsChips {...args} />;
export const HsChipsComponent = Template.bind({});
HsChipsComponent.args = dataSet;
