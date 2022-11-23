import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { SeoHtmlFooterDesktop } from './SeoHtmlFooterDesktop';

export default {
  title: 'SEO HTML Footer',
  component: SeoHtmlFooterDesktop,
};

interface ISeoHtmlFooterProps {
  description: string;
}

const Template: Story<ISeoHtmlFooterProps> = (args) => <SeoHtmlFooterDesktop {...args} />;
export const SeoHtmlFooterSB = Template.bind({});

SeoHtmlFooterSB.args = {
  description : "edsadadas"
};
