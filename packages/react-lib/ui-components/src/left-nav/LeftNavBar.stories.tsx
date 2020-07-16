import React, { FC } from 'react';
import LeftNavBar from './LeftNavBar';
import { LeftNavBarProps } from './LeftNavBar.interface';
import { BackIcon } from '@hs/icons';

export default {
  title: 'Left Nav Bar component',
};
const navItem: LeftNavBarProps = {
  navList: [
    { linkUrl: 'test-url', linkText: 'testText', icon: BackIcon },
    { linkUrl: 'test-url2', linkText: 'testText2', icon: BackIcon },
  ],
};
// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const LeftNavBarComponent: FC = () => <LeftNavBar {...navItem} />;
