import React, { FC } from 'react';
import { LeftNavBar } from './LeftNavBar';
import { LeftNavBarProps } from './ILeftNavBar';
import { CreateIcon, DashBoardIcon } from '@hs/icons';

export default {
  title: 'Left Nav Bar component',
};
const navItem: LeftNavBarProps = {
  navList: [
    { linkUrl: '/dashboard', linkText: 'DashBoard', icon: DashBoardIcon },
    { linkUrl: '/create', linkText: 'Create', icon: CreateIcon },
  ],
};
// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const LeftNavBarComponent: FC = () => <LeftNavBar {...navItem} />;
