import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { Accordian } from './Accordion';
import { IAccordianProps } from './IAccordion';

export default {
  title: 'Accordian',
  component: Accordian,
};

const Template: Story<IAccordianProps> = (args) => <Accordian {...args} />;
export const AccordianComponent = Template.bind({});

AccordianComponent.args = {};
