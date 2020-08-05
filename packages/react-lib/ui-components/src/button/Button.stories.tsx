import React, { FC } from 'react';
import { Button } from './Button';

export default {
  title: 'Button',
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
export const PrimaryButton: FC = () => <Button {...props} />;
export const SecondaryButton: FC = () => <Button {...secondary} />;
export const TertiaryButton: FC = () => <Button {...tertiary} />;
export const DisabledButton: FC = () => (
  <Button disabled={true} {...disabled} />
);
