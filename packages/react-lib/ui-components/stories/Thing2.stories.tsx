import React from 'react';
import { Thing2, Thing2Props } from '../src';

export default {
  title: 'React UI Components',
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const ThingComponent2 = (props?: Partial<Thing2Props>) => <Thing2 {...props} />;
