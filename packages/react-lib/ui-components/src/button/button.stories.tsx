import React, { FC } from 'react';
import { Button } from './button';

export default {
  title: 'Test Button',
};

const onClick = (event: React.MouseEvent) => {
  alert(event);
};
const props = {
  value: 'Test primary',
  className: 'primary' as const,
  onClick: onClick,
};

const secondary = {
  value: 'Test secondary',
  className: 'secondary' as const,
  onClick: onClick,
};

const tertiary = {
  value: 'Test Tertiary',
  className: 'tertiary' as const,
  onClick: onClick,
};

const disabled = {
  value: 'Test Disabled',
  className: 'disabled' as const,
  onClick: onClick,
};
export const PrimaryButtonComponent: FC = () => <Button {...props} />;
export const SecondaryButtonComponent: FC = () => <Button {...secondary} />;
export const TertiaryButtonComponent: FC = () => <Button {...tertiary} />;
export const DisabledButtonComponent: FC = () => (
  <Button disabled={true} {...disabled} />
);
