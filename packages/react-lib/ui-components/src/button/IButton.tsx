import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
  fontSize?: string;
  className: ClassName['className'];
  disabled?: false | true;
  onClick: (event: React.MouseEvent) => void;
}

export interface ClassName {
  className: 'primary' | 'secondary' | 'tertiary' | 'disabled';
}
