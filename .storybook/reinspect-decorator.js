import React from 'react';

import { StateInspector } from 'reinspect';

const ReinspectDecorator = (storyFn) => <StateInspector name="HS-StoryBook">{storyFn()}</StateInspector>;

export default ReinspectDecorator;
