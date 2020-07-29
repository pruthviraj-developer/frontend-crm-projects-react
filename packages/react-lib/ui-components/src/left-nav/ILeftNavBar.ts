import { HTMLAttributes, FC } from 'react';

export interface LeftNavBarProps extends HTMLAttributes<HTMLDivElement> {
  navList?: LeftNavItemProps[];
}
export interface LeftNavItemProps extends HTMLAttributes<HTMLDivElement> {
  linkUrl: string;
  linkText?: string;
  icon: FC<React.SVGProps<SVGSVGElement>>;
}
