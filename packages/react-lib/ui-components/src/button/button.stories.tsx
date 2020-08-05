import React, { FC } from 'react';
import { Button } from './button';

export default {
  title: 'Test Button',
};

const onClick = (event: React.MouseEvent) => {
  alert(event);
};
const props = {
  value: 'Test',
  className: 'tertiary' as const,
  fontSize: '24px',
  onClick: onClick,
};

export const TestButtonComponent: FC = () => <Button {...props} />;
